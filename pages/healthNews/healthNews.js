// pages/healthNews/healthNews.js
import { getRequest } from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    navScrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    list: [],
    height: 0
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
    console.log(token + 1111111111)
    //console.log(device + 222222222222)
    // if (token != '' ) {
    //   getRequest({
    //     url: '/v1/information/list_category',
    //     method: 'GET',
    //     success(res) {
    //       that.setData({
    //         list: res.data,

    //       })
    //     }
    //   });
    // } else {
    //   app.getToken().then(function (res) {
    //     console.log(111)
    //     getRequest({
    //       url: '/v1/information/list_category',
    //       method: 'GET',
    //       success(res) {
    //         that.setData({
    //           list: res.data,

    //         })
    //       }
    //     });
    //   })
      
    // }
    

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
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
    var currentData = that.data.currentData;//当前选项卡编号
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
  //跳转新闻详情
  articleInfo: function(e) {
    var article_id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/articleInfo/index?id=' + article_id
    })
  },
  //滑动切换导航
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    var singleNavWidth = this.data.windowWidth / 4;
    if (this.data.currentData == cur) {
      return false;
    } else {
      this.setData({
        currentData: cur
      })
    }
  },
  //点击切换选项卡内容
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 4;
    this.setData({
      currentData: cur,
    });
  }
})