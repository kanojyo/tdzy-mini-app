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

const baseUrl = app.globalData.baseUrl;
function getRequest(model) {
  var that = this;
  var token = app.globalData.token || '';
  if (app.globalData.token && app.globalData.token != '') {
    wx.request({
      url: baseUrl + model.url,
      data: model.param,
      header: {
        'Content-Type': 'application/json',
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
  } else {
    //由于请求是网络请求，可能会在Page.onLoad后才返回
    　　　//所以加入callback 防止这种情况
    app.tokenCallback = token => {
      if (token != '') 
      { //执行操作。。
        wx.request({
          url: baseUrl + model.url,
          data: model.param,
          header: {
            'Content-Type': 'application/json',
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
    }
  }
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