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
    var that = this;
    //积分明细
    if (that.data.currentData == 0) {
      var page = that.data.scoreParmas.page_index + 1;
      var status = true;
      if (status) {
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(() => {
          wx.hideLoading();
          var parmas = that.data.scoreParmas;
          getRequest({
            url: '/v1/sign/score_list?page_index=' + page + '&page_size=' + parmas.page_size,
            method: 'get',
            success(res) {
              status = false;
              if (res.data.data.length > 0) {
                //取原数组的最后一项last
                var last = that.data.scoreList.pop();
                //取下拉加载的数据的第一项first
                var first = res.data.data.shift();
                //判断last和first数据是不是同一个年份、月份之中;
                if (last.year == first.year && last.month == first.month){
                  last.list=last.list.concat(first.list)
                }else{
                  last = last.concat(first);
                }
                if (that.data.scoreList){
                  that.data.scoreList = that.data.scoreList.concat(last)
                }else{
                  that.data.scoreList = last;
                }
                if (that.data.data){
                  that.data.scoreList = that.data.scoreList.concat(that.data.data)
                }
                that.data.scoreParmas.page_index = page;
                that.setData({
                  scoreList: that.data.scoreList,
                });
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
                status = false;
              };
            }
          })
        }, 1000)
      }
    } else if (that.data.currentData == 1){
      var page = that.data.exchangeParmas.page_index+1;
      var status = true;
      if (status){
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(()=> {
          wx.hideLoading();
          var parmas = that.data.exchangeParmas;
          getRequest({
            url: '/v1/sign/exchange_list?page_index=' + page + '&page_size=' + parmas.page_size,
            method: 'get',
            success(res) {
              status = false;
              if(res.data.data.length > 0){
                that.data.exchageList = that.data.exchageList.concat(res.data.data);
                that.data.exchangeParmas.page_index = page;
                that.setData({
                  exchageList: that.data.exchageList
                });
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
              };
            }
          })
        },1000)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})