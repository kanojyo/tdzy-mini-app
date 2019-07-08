// pages/user/sign/sign.js
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    modelShow: false, //遮罩层状态
    is_first: 0, //是否本日首次点击
    tomorrow_score: 0, //明日签到获取的积分
    hotList: [],
    height: 0, //遮罩层的高度
    score: 10,
  },
  //动态设置遮罩层的高度
  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.setData({
          height: height
        });
      }
    });
  },
  //隐藏遮罩层
  modelHide() {
    var that = this;
    that.setData({
      modelShow: false,
    })
  },
  //获取我的签到页面的数据
  getData() {
    var that = this;
    getRequest({
      url: '/v1/sign/sign_up',
      method: 'GET',
      success(res) {
        console.log(res)
        that.setData({
          userInfo: res.data.user,
          hotList: res.data.hot_list,
          is_first: res.data.click_info.is_first
        });
        if (res.data.click_info.is_first === 1) {
          that.setData({
            tomorrow_score: res.data.click_info.tomorrow_score,
            score: res.data.click_info.today_score,
            modelShow: true,
          })
        }
      }
    })
  },
  //跳转到规则页面
  GotoRules() {
    wx.navigateTo({
      url: 'rule/rule',
    })
  },
  //跳转我的积分
  GotoScore() {
    wx.navigateTo({
      url: 'score/score',
    })
  },
  //立即兑换
  exchange(e) {
    // console.log(e);
    let id = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'detail/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    //获取我的签到页面的数据
    this.getData();
    this.getHeight();
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