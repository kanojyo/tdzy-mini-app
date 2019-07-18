// pages/user/collect/collect.js
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page_index:1,
    page_size:10,
    maxPage:0,
  },
  getList(){
    var that =this;
    getRequest({
      url: '/v1/collection/index?page_index=' + that.data.page_index ,
      method:'GET',
      success(res){
        console.log(res)
        that.setData({
          list:res.data.data,
          maxPage: res.data.max_page
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
  //文章详情
  acticle_info: function (e) {
    var article_id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/articleInfo/index?id=' + article_id
    })
  }
})