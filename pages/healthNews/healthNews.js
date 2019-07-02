// pages/healthNews/healthNews.js
import { getRequest } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;

    getRequest({
      url: '/v1/information/list_category',
      method: 'GET',
      success(res) {
        console.log(res)
        that.setData({
          list: res.data,
          
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
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    // console.log(e,111)
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    // console.log(e,2222)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //跳转新闻详情
  articleInfo: function(e) {
    var article_id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/articleInfo/index?id=' + article_id
    })
  }
})