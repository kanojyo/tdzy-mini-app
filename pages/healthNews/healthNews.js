// pages/healthNews/healthNews.js
import { getRequest } from '../../utils/util.js';
const app = getApp()

var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    scrollLeft: 0,
    list: [],
    page: 1,
    winHeight: "",//窗口高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "健康科普"//页面标题为路由参数
    })
    var that = this;
    var token = app.globalData.token;
    getRequest({
      url: '/v1/information/list_category',
      method: 'GET',
      success(res) {
        that.setData({
          list: res.data,

        })
      }
    });
    
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc,
          height: res.windowHeight
        });
      }
    });
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
    var currentData = that.data.currentTab;//当前选项卡编号
    var category_id = that.data.list[currentData].id;//分类id
    var page = that.data.list[currentData].list_article.page + 1;
    var status = true;
    if (category_id) {
      if (status) {
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(function () {
          wx.hideLoading();
          getRequest({
            url: '/v1/information/list_article?category_id=' + category_id + '&page_index=' + page + "&page_size=20",
            method: 'GET',
            success(res) {
              status = false;
              if (res.data.data.length > 0) {
                that.data.list[currentData].list_article.data = that.data.list[currentData].list_article.data.concat(res.data.data);
                if (res.data.data.length < 19) {
                  that.setData({
                    bottomTitle: true,
                    title: '-- 我是有底线的 --',
                  })
                } else {
                  status = true;
                }
                
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
                status = false;
              }
              
              //that.data.list[currentData].list_article.data = that.data.list[currentData].list_article.data.concat(res.data.data);
              that.data.list[currentData].list_article.page = that.data.list[currentData].list_article.page + 1;
              that.setData({
                list: that.data.list
              });
            }
          });
        }, 2000);
      } 
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  //跳转新闻详情
  articleInfo: function(e) {
    var article_id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/articleInfo/index?id=' + article_id
    })
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      console.log(cur)
      this.setData({
        currentTab: cur
      })
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: 400
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
})