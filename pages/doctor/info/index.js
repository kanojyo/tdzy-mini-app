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
          scheduling_status: res.data.scheduling_status,
          id:id,
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
    var doctor_id = e.currentTarget.id;

    getRequest({
      url: '/v1/appointment/user_info_perfect',
      method: 'GET',
      success(res) {
        if (!res.data.status) {
          wx.showModal({
            //title: '完善就诊人信息后才可以预约哦',
            showCancel: false,
            confirmText: "立即前往",
            confirmColor: "#d1b574",
            content: '完善就诊人信息后才可以预约哦',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/doctor/bind/index?id=' + doctor_id + "&page=doctorinfo",
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
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