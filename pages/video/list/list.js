// pages/video/list/list.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    page: 1,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    var that = this;
    getRequest({
      url: '/v1/video/list',
      method: 'get',
      success: function (res) {
        for (let i = 0; i < res.data.data.length; i ++) {
          res.data.data[i].video_length = that.getFormatTime(res.data.data[i].video_length);
        }
        that.setData({
          list: res.data.data,
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
    var that = this;
    var page = that.data.page + 1;
    var status = true;

    if (status) {
      wx.showLoading({
        title: '拼命加载中',
      });
      setTimeout(function () {
        wx.hideLoading();
        getRequest({
          url: '/v1/video/list?page_index=' + page + "&page_size=" + that.data.pageSize,
          method: 'get',
          success: function (res) {
            status = false;
            if (res.data.data.length > 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].video_length = that.getFormatTime(res.data.data[i].video_length);
              }
              that.data.list = that.data.list.concat(res.data.data);
              if (res.data.data.length < 19) {
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

            that.data.page = that.data.page + 1;
            that.setData({
              list: that.data.list
            });
          }
        });
        
      }, 2000);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  info: function(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/video/info/info?id=" + id,
    })
  },
  getFormatTime: function(result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
  }
})