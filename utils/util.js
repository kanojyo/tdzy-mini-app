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
const device = wx.getStorageSync('device')||'';
const token = wx.getStorageSync('token') || '';

function getRequest(model) {
  wx.request({
    url: baseUrl + model.url,
    data: model.param,
    method: model.method,
    header: {
      'Content-Type': 'application/json',
      'device': device,
      'Authorization': 'Bearer ' + token
    },
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

function getBaseUrl() {
  return baseUrl;
}

module.exports = {
  formatTime: formatTime,
  getRequest: getRequest,
  getBaseUrl: getBaseUrl
}
