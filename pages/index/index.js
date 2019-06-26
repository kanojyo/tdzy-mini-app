//index.js
//获取应用实例
import { getRequest } from '../../utils/util.js';
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
  },
  onShareAppMessage: function () {
    return {
      title: '泰斗医聊',
      path: '/index/index?id=123'
    }
  },
  onLoad: function () {
    var that = this;
    getRequest({
      url: '/v1/medical_info/index',
      param: '',
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrls: res.data.banner,
          officeList: res.data.list_office,
          doctorList: res.data.list_doctor,
          article: res.data.list_hot_article
        })
      }
    })
  },
  //查看更多新闻推荐
  all_news: function () {
    wx.switchTab({
      url: '/pages/healthNews/healthNews',
    })
  }
})
