const util = require('../../utils/util');
Page({
  formSubmit: function (e) {
    var fromId = e.detail.formId;
    var name = "泰斗中医院";
    var mobile = 13545383720;
    var doctor_name = "我叫零零一";

    wx.request({
      url: util.getBaseUrl() + '/v1/test_form',
      method: 'POST',
      data: { form_id: fromId, name: name, doctor_name: doctor_name, mobile: mobile },
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showModal({
            title: '提示',
            content: "成功",
            showCancel: false,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
          })
        }
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})