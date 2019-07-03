// pages/user/user.js
import { getRequest } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    telephone:'111111',
    newFeedBack:false,
  },
  //跳转我的签到
  GotoSign(){
    wx.navigateTo({
      url: 'sign/sign',
    })
  },
  //跳转我的预约
  GotoBook(){
    wx.navigateTo({
      url: 'book/book',
    })
  },
  //跳转我的收藏
  GotoCollect(){
    wx.navigateTo({
      url: 'collect/collect',
    })
  },
  //跳转真伪查询
  GotoAuth(){
    wx.navigateTo({
      url: 'authenticity/authenticity',
    })
  },
  //跳转意见反馈
  GotoFeedBack(){
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  //是否有未读的意见反馈
  check(){
    var that =this;
    getRequest({
      url:'/v1/feedback/unread',
      method:'GET',
      success(res){
        if (res.data.data ===1){
          //如果有新的未读意见反馈就改变状态；
          that.setData({
            newFeedBack:true,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.getUserInfo({
      success: function (res) {
        var data = JSON.parse(res.rawData)
        console.log(data)
        that.setData({
          userInfo: data
        })

      }
    });
    this.check();
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