// pages/doctor/order/index.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
const app = getApp();
const baseUrl = "https://tdxcx.wuhanlst.com";
var session_key = '';

const getChaYMD = (number, format) => {
  
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doctor_id = options.id;
    let that = this;
    var title = "";
    wx.request({
      url: baseUrl + '/v1/appointment/doctor_work_info?doctor_id=' + doctor_id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        var list = res.data.data.work_list;
        for (var i = 0; i < list.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          list[i]["order_time"] = getChaYMD(list[i]["order_time"], 'Y-M-D');
        }
        that.setData({
          doctor: res.data.data.doctor_info,
          work: list
        })
        wx.setNavigationBarTitle({
          title: res.data.data.doctor_info.name + "医生"
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
  onShareAppMessage: function () {

  },
  //点击预约界面
  order_role: function () {
    wx.navigateTo({
      url: '/pages/doctor/orderRole/orderRole',
    })
  },
})