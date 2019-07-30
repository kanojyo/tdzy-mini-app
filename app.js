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
  },
  globalData: {
    userInfo: null,
  }
})