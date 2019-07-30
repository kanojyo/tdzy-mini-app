//app.js
let utils = require('utils/util.js');
import { getRequest } from 'utils/util.js';
App({
  data: {
    modal: false
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const baseUrl = "https://tdxcx.wuhanlst.com";
    var device = '';
    var token = '';
    var session_key = '';
    var that = this;
    //获取设备号
    wx.request({
      url: baseUrl + '/v1/device',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success(res) {
        device = res.data.data.device;
        //将设备号储存起来
        wx.setStorageSync('device', device)
      }
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        if (res.code) {
          wx.request({
            url: baseUrl + '/v1/login',
            data: {
              code: res.code
            },
            header: {
              'Content-Type': 'application/json',
              'device': wx.getStorageSync('device'),
            },
            success(e) {
              token = e.data.data.token;
              session_key = e.data.data.session_key;
              token = e.data.data.token;
              //将token储存起来
              wx.setStorageSync('token', token)
              wx.setStorageSync('session_key', session_key)
            }
          })
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.showTabBar();
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // console.log(res)
    //           if(res){
    //             wx.request({
    //               url: baseUrl + '/v1/get_user_info',
    //               data: {
    //                 session: wx.getStorageSync('session_key'),
    //                 encryptData:res.encryptedData,
    //                 iv: res.iv,
    //               },
    //               method:'POST',
    //               header: {
    //                 'Content-Type': 'application/json',
    //                 'device': wx.getStorageSync('device'),
    //                 'Authorization': 'Bearer '+wx.getStorageSync('token')
    //               },
    //               success(e) {
    //               }
    //             })
    //           }
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }else{
    //       // 用户没有授权
    //       // 改变 isHide 的值，显示授权页面
    //       wx.hideTabBar();
    //       // that.setData({
    //       //   modal: true
    //       // });
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})