const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    
  },
  onLoad: function(option) {
    
  },
  formSubmit: function (e) {
    var form_id = e.detail.formId;
    
    wx.request({
      url: util.getBaseUrl() + '/v1/test/temp_msg',
      method: 'POST',
      data: {form_id: form_id },
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success(res) {
        
      }
    })
  },
})