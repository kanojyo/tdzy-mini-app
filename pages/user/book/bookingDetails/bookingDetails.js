// pages/user/book/bookingDetails/bookingDetails.js
let utils = require('../../../../utils/util.js');
import { getRequest } from '../../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:[],
  },
  //获取页面数据
  getData(){
    var that = this;
    getRequest({
      url: '/v1/appointment/appointment_info?appointment_id=' + that.data.id,
      method: 'get',
      success: function (res) {
        console.log(res)
        that.setData({
          info: res.data,
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      id:options.id
    })
    that.getData();
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

  }
})