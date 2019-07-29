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
  var device = wx.getStorageSync('device') || '';
  var token = wx.getStorageSync('token') || '';
  if (device !== '' && token !== '') {
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
  } else {
    console.log("授权错误");
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
