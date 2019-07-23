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
    var id = options.id;
    var that = this;
    var article_info;
    getRequest({
      url: '/v1/information/detail?article_id=' + id,
      param: '',
      method: 'GET',
      success: function (res) {
        console.log(res)
        var info = res.data;
        WxParse.wxParse('info', 'html', info.article_content, that, 0);
        res.data.created_at = getFormatTime(res.data.created_at, 'Y-M-D h:m:s');
        that.setData({
          article_info: res.data
        })
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
    console.log(nums)
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
    return {
      title: that.data.article_info.article_title,
      desc: that.data.article_info.article_description,
      path: that.data.article_info.article_url,
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