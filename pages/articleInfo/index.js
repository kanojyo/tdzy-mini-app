import { getRequest } from '../../utils/util.js';
var WxParse = require('../../wxParse/wxParse.js');
const getFormatTime = (number, format) => {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getCurrentPageUrl = () => {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

/*获取当前页带参数的url*/
const getCurrentPageUrlWithArgs = () => {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //我要咨询
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getCurrentPageUrlWithArgs())
    var id = options.id;
    var that = this;
    var article_info;
    getRequest({
      url: '/v1/information/detail?article_id=' + id,
      param: '',
      method: 'GET',
      success: function (res) {
        var info = res.data;

        if (info.article_content) {
          WxParse.wxParse('info', 'html', info.article_content, that, 0);
          res.data.created_at = getFormatTime(res.data.created_at, 'Y-M-D h:m:s');
          that.setData({
            article_info: res.data
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '亲，您的网络异常，快去检查一下吧',
          //icon: 'success',
          duration: 2000
        });
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this;
    var nums = that.data.article_info.article_share;
    that.data.article_info.article_share = nums + 1;
    that.data.article_info.is_share = 1;
    that.setData({
      article_info: that.data.article_info
    })
    
    getRequest({
      url: '/v1/information/share_article?article_id=' + that.data.article_info.id,
      param: '',
      method: 'GET',
      success: function (result) {

      }
    })
    var url = that.data.article_info.article_url;
    return {
      title: that.data.article_info.article_title,
      desc: that.data.article_info.article_description,
      path: getCurrentPageUrlWithArgs(),
      success: function(res) {
        
      }
    }
  },
  //点赞
  star:function (e) {
    var id = e.currentTarget.id;
    var that = this;
    getRequest({
      url: '/v1/information/collect?article_id=' + id,
      param: '',
      method: 'GET',
      success: function (res) {
        var nums = that.data.article_info.article_collection;
        if (res.data.status == 1) {
          that.data.article_info.article_collection = nums + 1;
          that.data.article_info.is_collect = 1;
          
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          });
          
        } else {
          that.data.article_info.article_collection = nums - 1;
          that.data.article_info.is_collect = 2;
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 2000
          });
          
        }
        that.setData({
          article_info: that.data.article_info
        })
      }
   })
  }
})