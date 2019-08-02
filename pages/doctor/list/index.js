// pages/doctor/list.js

import { getRequest } from '../../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    navScrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getRequest({
      url: '/v1/medical_info/recommend_doctor',
      method: 'GET',
      success(res) {
        var arr = res.data;
        that.setData({
          doctorList: arr.data
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
    this.onLoad();
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
    var that = this;
    var page = that.data.page + 1;
    var status = true;
    
    if (status) {
      wx.showLoading({
        title: '拼命加载中',
      });
      setTimeout(function () {
        getRequest({
          url: '/v1/medical_info/recommend_doctor?page_index=' + page,
          method: 'GET',
          success(res) {
            status = false;
            if (res.data.data.length > 0) {
              that.data.doctorList = that.data.doctorList.concat(res.data.data);
              if (res.data.data.length < 10) {
                that.setData({
                  bottomTitle: true,
                  title: '-- 我是有底线的 --',
                })
              } else {
                status = true;
              }

            } else {
              wx.showToast({
                title: '没有更多内容了',
                icon: 'none',
                duration: 2000
              })
              status = false;
            }

            that.setData({
              doctorList: that.data.doctorList,
              page: page
            });
          }
        });
        wx.hideLoading();
      }, 2000);
    }
    
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
                  url: '/pages/doctor/bind/index?id=' + doctor_id + "&page=order"
                })
              } else if (res.cancel) {
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
  },
  //跳转医生详情
  doctorInfo: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/doctor/info/index?doctor_id=" + id,
    })
  }
})