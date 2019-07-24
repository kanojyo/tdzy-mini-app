// pages/user/user.js
let utils = require('../../utils/util.js');
import { getRequest } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    telephone:'',
    newFeedBack:false,
    newMessage:0,
  },
  //跳转我的签到
  GotoInfo(){
    wx.navigateTo({
      url: 'info/info',
    })
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
  //跳转消息中心
  GotoMessage(){
    wx.navigateTo({
      url: 'message/message',
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
  //是否消息中心有新消息
  hasMessage(){
    var that =this;
    getRequest({
      url:'/v1/message/has_message',
      method:'GET',
      success(res){
        let num = res.data.msg_count;
        if (num>99){
          that.setData({
            newMessage:'99+',
          })
        }else{
          that.setData({
            newMessage: num,
          })
        }
      }
    })
  },
  getInfo(){
    var that =this;
    getRequest({
      url:'/v1/sign/my_info',
      method:'get',
      success(res){
        // console.log(res)
        that.setData({
          // telephone: res.data.mobile,
          userInfo: res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.check();
    //获取基本资料
    that.getInfo();
    //是否消息中心有新消息
    that.hasMessage();
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
  formSubmit: function (e) {
    var page = 'pages/user/sign/sign';
    var form_id = e.detail.formId;
    wx.request({
      url: utils.getBaseUrl() + '/v1/sign/sign_up',
      method: 'POST',
      data:{
        page: page,
        form_id: form_id
      },
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        wx.navigateTo({
          url: 'sign/sign',
        })
       
      }
    })
    
  }
})