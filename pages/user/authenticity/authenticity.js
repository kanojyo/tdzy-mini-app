202020// pages/user/authenticity/authenticity.js
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat:'',
    declare_txt:"为提升武汉泰斗中医院服务质量，维护武汉泰斗中医院和用户的合法权益，武汉泰斗中医院特地开通了“防伪查询”服务平台，提供“微信号查询”服务，帮助用户辨微信号真伪，认准主体，防止不法分子钻空子，避免上当受骗。",
    queryData:[
      {"text": "1.打开微信找到您咨询对象的微信号"},
      {"text":"2.在查询框内输入咨询微信号"},
      {"text":"3.点击“确认查询”按钮"},
      {"text":"4.查看显示结果辨清主体"}
    ],
    intro_txt:"在“互联网+医疗”大趋势的影响下，武汉泰斗中医院积极响应国家号召，联合武汉大学安全学院共同开了全国首款M2O物联网智能诊断系统、DTP健康管理服务他系统，为广大用户提供互联网+中医的特色服务。同时，为维护医院和用的合法权益，帮助用户快速辨析、找准主体，医院开通了“微信号防伪查询”服役，防止用户上当受骗。",
    addressData:[
      { "text": "地址：湖北省武汉市洪山区雄楚大街428号 " },
      { "text": "电话：027-85555789" },
      { "text": "官网：http://www.whtdzyy.com/" },
    ]
  },
  //双向绑定input的值
  updateValue(e){
    var that = this;
    that.setData({
      wechat: e.detail.value
    })
  },
  //验证微信号真伪
  check(){
    console.log(22)
    var that =this;
    getRequest({
      url:'/v1/verify/check_wechat?weixin='+that.data.wechat,
      method:'GET',
      success(res){
        console.log(res);
        if(res.code ===200){
          if (res.data.status===1){
            wx.showModal({
              title: '提示',
              content: '此微信号是武汉泰斗中医院所有, 请您放心使用',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          } else if (res.data.status === 0){
            wx.showModal({
              title: '提示',
              content: '此微信号是非武汉泰斗中医院所有,谨防上当受骗',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        }
      }
    })
  },
  //打电话
  call(){
    wx.makePhoneCall({
      phoneNumber: '027-85555789' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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