// pages/doctor/list.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
const app = getApp();
const baseUrl = "https://tdxcx.wuhanlst.com";
var session_key = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: baseUrl + '/v1/medical_info/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        var arr = res.data.data;
        that.setData({
          doctorList: arr.list_doctor
        })

      }
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
  //预约点击按钮
  order: function (e) {
    var doctor_id = e.currentTarget.id;
    //检测用户是否绑定信息
    wx.request({
      url: baseUrl + '/v1/appointment/user_info_perfect',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        if (!res.data.data.status) {
          wx.navigateTo({
            url: '/pages/doctor/bind/index?id=' + doctor_id
          })
        } else {
          wx.navigateTo({
            url: '/pages/doctor/order/index?id=' + doctor_id,
          })
        }
      }
    })
  }
})