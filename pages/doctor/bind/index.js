// pages/doctor/bind.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
const app = getApp();
const baseUrl = "https://tdxcx.wuhanlst.com";
var session_key = '';

const age = [];
const user_age = "";
for (let i = 1; i <= 100; i++) {
  age.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: age,
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
    }
  },
  formSubmit: function (e) {

    var age = this.data.user_age;
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
        url: baseUrl + '/v1/appointment/update_user_info',
        method: 'POST',
        data: {gender : sex, name : name, age : age, mobile : mobile},
        header: {
          'Content-Type': 'application/json',
          'device': wx.getStorageSync('device'),
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code == 200) {
            //绑定个人信息成功跳转医生预约页面
            wx.navigateTo({
              url: '/pages/doctor/order/index?id=' . doctor_id
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '出错了，请重试',
              showCancel: false,
            })
          }
        }
      })
    }


    console.log(user_age)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doctor_id = options.id
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
})