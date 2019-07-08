// pages/doctor/bind.js
import { getRequest } from '../../../utils/util.js';
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: [],
    user_age:"",
    // 最大字符数
    maxTextLen: 20,
    // 默认长度
    textLen: 0,
    getWords(e) {
      let page = this;
      // 设置最大字符串长度(为-1时,则不限制)
      let maxTextLen = page.data.maxTextLen;
      // 文本长度
      let textLen = e.detail.value.length;

      page.setData({
        maxTextLen: maxTextLen,
        textLen: textLen
      });
    },
    
  },
  formSubmit: function (e) {
    var that = this;
    var doctor_id = that.data.doctor_id;
    var age = that.data.user_age;
    var name = e.detail.value.name;
    var sex = e.detail.value.sex;
    var mobile = e.detail.value.mobile;
    if (!sex) {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
        showCancel: false,
      })
    } else if (!name) {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
      })
    } else if (!age) {
      wx.showModal({
        title: '提示',
        content: '请选择年龄',
        showCancel: false,
      })
    } else if (!(/^1[34578]\d{9}$/.test(mobile))) {
      wx.showModal({
        title: '提示',
        content: '手机号格式错误',
        showCancel: false,
      })
    } else {
      wx.request({
        url: util.getBaseUrl() + '/v1/appointment/update_user_info',
        method: 'POST',
        data: { gender: sex, name: name, age: age, mobile: mobile },
        header: {
          'Content-Type': 'application/json',
          'device': wx.getStorageSync('device'),
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code == 200) {
            //绑定个人信息成功跳转医生预约页面
            wx.navigateTo({
              url: '/pages/doctor/order/index?id=' + doctor_id,
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var doctor_id = options.id    
    var age = [];
    for (let i = 1; i <= 100; i++) {
      age.push(i)
    }
    that.setData({
      age:age,
      doctor_id: doctor_id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindChange: function (e) {
    const val = e.detail.value
    console.log(this.data.age)
    this.setData({
      user_age: this.data.age[val[0]],
    })
    console.log(this)
  },
  bindPickerChange: function (e) {
    var that = this;
    const val = e.detail.value
    that.setData({
      user_age: that.data.age[val],
    })
  }
})