//index.js
//获取应用实例
let utils = require('../../utils/util.js');
import { getRequest } from '../../utils/util.js';
const app = getApp();
const baseUrl = "https://tdxcx.wuhanlst.com";
var session_key = '';

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    height:0,
  },
  //动态设置遮罩层的高度
  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        let clientHeight = res.screenHeight;
        let clientWidth = res.screenWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        console.log(height)
        that.setData({
          height: height
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '泰斗医聊',
      path: '/index/index?id=123'
    }
  },
  GotoAuth() {
    wx.navigateTo({
      url: '/pages/user/authenticity/authenticity',
    })
  },
  formSubmit: function (e) {
    var page = 'pages/index/index';
    var form_id = e.detail.formId;
    wx.request({
      url: utils.getBaseUrl() + '/v1/sign/sign_up',
      method: 'POST',
      data: {
        page: page,
        form_id: form_id
      },
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/user/sign/sign',
        })
      }
    })
  },
  bindGetUserInfo: function(e)  {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.showTabBar();
      wx.getUserInfo({
        success: function (res) {
          wx.request({
            url: baseUrl + '/v1/get_user_info',
            data: {
              session: wx.getStorageSync('session_key'),
              encryptData: res.encryptedData,
              iv: res.iv,
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'device': wx.getStorageSync('device'),
            },
            success(e) {
              console.log(e)
            }
          })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  shouquan(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // wx.showTabBar();
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              wx.request({
                url: baseUrl + '/v1/get_user_info',
                data: {
                  session: wx.getStorageSync('session_key'),
                  encryptData: res.encryptedData,
                  iv: res.iv,
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                  'device': wx.getStorageSync('device'),
                },
                success(e) {
                }
              })
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          wx.hideTabBar();
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  onLoad: function () {
    var that = this;
    that.getHeight();
    that.getIndex();
    that.shouquan();

  },
  onReady(){
  },
  onShow() {
    if (wx.getStorageSync('token') && wx.getStorageSync('device')) {
      this.getIndex();
    }
  },
  getIndex(){
    var that = this; 
    wx.request({
      url: baseUrl + '/v1/medical_info/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        var arr = res.data.data;
        that.setData({
          imgUrls: arr.banner,
          officeList: arr.list_office,
          hospital: arr.hospital,
          doctorList: arr.list_doctor,
          article: arr.list_hot_article
        })

      }
    })
  },
  
  //查看更多新闻推荐
  all_news: function () {
    wx.switchTab({
      url: '/pages/healthNews/healthNews',
    })
  },
  //文章详情
  acticle_info: function (e) {
    var article_id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/articleInfo/index?id=' + article_id
    })
  },
  //跳转医生列表
  doctor_list: function() {
    wx.navigateTo({
      url: '/pages/doctor/list/index'
    })
  },
  //首页预约医生按钮
  order: function (e) {
    var doctor_id = e.currentTarget.id;
    
    //检测用户是否绑定信息
    wx.request({
      url: baseUrl + '/v1/appointment/user_info_perfect',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        if (!res.data.data.status) {
          wx.navigateTo({
            url: '/pages/doctor/bind/index?id=' + doctor_id
          })
        } else {
          wx.navigateTo({
            url: '/pages/doctor/order/index?id=' + doctor_id,
          })
        }
      }
    })
  },
  //跳转科室介绍
  officeInfo: function (e) {
    var office_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/office/introduce?office_id=" + office_id
    })
  },
  //医院导航
  hospitalLocation: function() {
    wx.navigateTo({
      url: "/pages/map/map"
    })
  },
  //跳转医院详情
  goHospital: function() {
    wx.navigateTo({
      url: "/pages/hospital/index"
    })
  }
})
