// pages/user/feedback/feedback.js
import {getRequest} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 3,
    chatList: [],
  },
  //获取意见反馈列表
  getList() {
    var that = this;
    getRequest({
      url: '/v1/feedback/index',
      method: 'GET',
      success(res) {
        console.log(res)
        that.setData({
          state: res.data.state,
          chatList:res.data.list
        })
      }
    })
  },
  //提问、追问
  gotoUpload() {
    wx.navigateTo({
      url: 'upload/upload',
    })
  },
  //关闭
  close(){
    getRequest({
      url:'/v1/feedback/end',
      method:'GET',
      success(res){
        console.log(res.code)
        if (res.code ===200){
          //返回上一页
          wx.navigateBack({
            delta: 1
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})