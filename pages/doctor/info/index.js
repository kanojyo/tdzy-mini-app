// pages/doctor/info/index.js
import { getRequest } from '../../../utils/util.js';

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
    var id = options.doctor_id;
    var that = this;
    getRequest({
      url: '/v1/medical_info/doctor_brief?doctor_id=' + id,
      method: 'GET',
      success(res) {
        wx.setNavigationBarTitle({
          title: res.data.name + "医生"
        });
        that.setData({
          images: res.data.brief,
          id:id
        })
      }
    });
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
  //跳转预约页面
  orderDoctor: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/doctor/order/index?id=" + id,
    })
  }
})