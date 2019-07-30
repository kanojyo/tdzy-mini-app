const app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const baseUrl = "https://tdxcx.wuhanlst.com";


function getRequest(model) {
  var that = this;
  var device = wx.getStorageSync('device') || '';
  var token = wx.getStorageSync('token') || '';
  console.log(token)
  if (device == '') {
    wx.request({
      url: baseUrl + '/v1/device',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success(res) {
        device = res.data.data.device;
        //将设备号储存起来
        wx.setStorageSync('device', device)
      }
    });
  }

  if (token == '') {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        if (res.code) {
          wx.request({
            url: baseUrl + '/v1/login',
            data: {
              code: res.code
            },
            header: {
              'Content-Type': 'application/json',
              'device': wx.getStorageSync('device'),
            },
            success(e) {
              token = e.data.data.token;
              session_key = e.data.data.session_key;
              token = e.data.data.token;
              //将token储存起来
              wx.setStorageSync('token', token)
              wx.setStorageSync('session_key', session_key)
            }
          })
        }
      }
    })
  }
  
  wx.request({
    url: baseUrl + model.url,
    data: model.param,
    header: {
      'Content-Type': 'application/json',
      'device': device,
      'Authorization': 'Bearer ' + token
    },
    method: model.method,
    success: function (res) {
      model.success(res.data)
    },
    fail: function (res) {
      wx.showModal({
        title: res,
        showCancel: false
      })
    }
  })

}

function getBaseUrl() {
  return baseUrl;
}
function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}

module.exports = {
  formatTime: formatTime,
  getRequest: getRequest,
  getBaseUrl: getBaseUrl,
  buttonClicked: buttonClicked
}
