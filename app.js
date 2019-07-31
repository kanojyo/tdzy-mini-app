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
    console.log('onlaunch')
    const baseUrl ="https://tdxcx.wuhanlst.com";
    var device ='';
    var token='';
    var session_key='';
    var that = this;
    //获取设备号
    console.log('device')
    wx.request({
      url: baseUrl + '/v1/device',
      header: {
        'Content-Type': 'application/json'
      },
      method:'GET',
      dataType:'json',
      success(res){
        console.log('deviceSuccess')
        device=res.data.data.device;
        //将设备号储存起来
        wx.setStorageSync('device', device)
      }
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        console.log('login')
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
            success(e){
              console.log('loginSuccess')
              that.globalData.token = e.data.data.token;
              token = e.data.data.token;
              session_key = e.data.data.session_key;
              token = e.data.data.token;
              //将token储存起来
              wx.setStorageSync('token', token)
              wx.setStorageSync('session_key', session_key)
              //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.tokenCallback) {
                that.tokenCallback(token);
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token:'',
  }
})