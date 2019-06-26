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
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    officeList:[
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/male@2x.png",
        "text":"男科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/breast@2x.png",
        "text":"乳腺科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/rhinitis@2x.png",
        "text":"鼻炎科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/anorectal@2x.png",
        "text":"肛肠科"
      }
    ],
    doctorList:[
      {
        "id": 6,
        "name": "泰斗中医",
        "avatar": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190329/201903293e896dc4ed2a44d5974b0e718a3a6df0.png",
        "position": "主治医生",
        "brief": "测试医生哦，你值得拥有！",
        "label": [
          "666",
          "医生大佬",
          "测试"
        ],
        "keshi": "补肾科",
        "link_url": "http://osscdn.whtdzyy.com/web/minyisheng/index.html"
      },
      {
        "id": 5,
        "name": "医生唐燉俊",
        "avatar": "https://cdn-statis.mangguokandian.com/avatar.png",
        "position": "主治医生",
        "brief": "这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介",
        "label": [
          "专注男科30年",
          "著名医生"
        ],
        "keshi": "补肾科",
        "link_url": "http://osscdn.whtdzyy.com/web/minyisheng/index.html"
      }
    ],
    article:[
      {
        "id": 114,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190402/20190402c5de9b1bbb0da1e6c8e0d1d54242c861.jpg",
        "category_id": 63,
        "article_tag": "痔疮科",
        "article_title": "24",
        "article_description": "测试",
        "article_url": "http://192.168.0.123:8012/info/114.html",
        "status": 2
      },
      {
        "id": 37,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190318/201903183909b0addfdfc15aceed0ceaa03337da.jpg",
        "category_id": 30,
        "article_tag": "痔疮科,心脏科",
        "article_title": "几乎所有人脸上都有的生物：蠕形螨1",
        "article_description": "本文译自 Funfactz，由译者 HTT110 基于创作共用协议(BY-NC)发布。1",
        "article_url": "http://192.168.0.123:8012/info/37.html",
        "status": 2
      },
    ]
  },
  onShareAppMessage: function () {
    return {
      title: '泰斗医聊',
      path: '/index/index?id=123'
    }
  },
  bindGetUserInfo: function(e)  {
    console.log(e)
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
      that.getIndex();
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
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
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
                  // console.log(e)
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
  onReady(){
  },
  onShow() {
    if (wx.getStorageSync('token') && wx.getStorageSync('device')) {
      this.getIndex();
    }
  },
  getIndex(){
    wx.request({
      url: baseUrl + '/v1/medical_info/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        
      }
    })
  }
  
  
})
