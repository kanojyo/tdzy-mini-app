// pages/user/sign/score/score.js
const utils = require('../../../../utils/util.js');
import { getRequest } from '../../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    currentData: 0,
    month: 0,
    scoreParmas: {
      page_index: 1,
      page_size: 20
    },
    exchangeParmas: {
      page_index: 1,
      page_size: 20
    },
    scoreList: [],
    exchageList: []
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
  //获取基本信息
  getInfo() {
    var that = this;
    getRequest({
      url: '/v1/sign/my_info',
      method: 'get',
      success(res) {
        that.setData({
          score: res.data.score
        })
      }
    })
  },
  //获取积分列表
  getScoreList() {
    var that = this;
    var parmas = that.data.scoreParmas;
    getRequest({
      url: '/v1/sign/score_list?page_index=' + parmas.page_index + '&page_size=' + parmas.page_size,
      method: 'get',
      success(res) {
        that.setData({
          scoreList: res.data.data
        })
        console.log(that.data.scoreList)
      }
    })
  },
  getMonth() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    this.setData({
      month: month
    })

  },
  //获取兑换列表
  getExchangeList() {
    var that = this;
    var parmas = that.data.exchangeParmas;
    getRequest({
      url: '/v1/sign/exchange_list?page_index=' + parmas.page_index + '&page_size=' + parmas.page_size,
      method: 'get',
      success(res) {
        // console.log(res)
        that.setData({
          exchageList: res.data.data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取基本信息
    this.getInfo();
    //获取积分明细
    this.getScoreList();
    //获取兑换记录
    this.getExchangeList()
    //获取当前时间的月份
    this.getMonth();
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