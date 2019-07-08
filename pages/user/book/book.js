// pages/user/book/book.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    id:0,
    list1: [],//未就诊
    list2:[],//已就诊
    list3:[],//已取消
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //未就诊
  getList1(){
    var that =this;
    getRequest({
      url: '/v1/my_appointment/list?status=1',
      method: 'get',
      success: function (res) {
        // console.log(res)
        that.setData({
          list1:res.data,
        })
      }
    });
  },
  //已就诊
  getList2(){
    var that = this;
    getRequest({
      url: '/v1/my_appointment/list?status=2',
      method: 'get',
      success: function (res) {
        that.setData({
          list2: res.data,
        })
      }
    });
  },
  //已取消
  getList3(){
    var that = this;
    getRequest({
      url:'/v1/my_appointment/list?status=3',
      method:'get',
      success:function(res){
        that.setData({
          list3: res.data,
        })
      }
    });
  },
  //取消预约
  cancel(){
    var that =this;
    wx.request({
      url: utils.getBaseUrl()+'/v1/appointment/cancel_appointment',
      data:{
        appointment_id: that.data.id
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        // console.log(res);
        if(res.code ===200){
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(res){

      }
    });
  },
  openConfirm: function (e) {
    var that =this;
    that.setData({
      id: e.currentTarget.id
    })
    wx.showModal({
      title: '提示',
      content: '是否取消预约',
      success(res) {
        if (res.confirm) {
          //用户点击确定
          that.cancel();
        } else if (res.cancel) {
          //用户点击取消
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList1()
    this.getList2()
    this.getList3()
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