// pages/doctor/order/index.js
const util = require('../../../utils/util');
import { getRequest } from '../../../utils/util.js';

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var doctor_id = options.id;
    let that = this;
    var title = "";

    getRequest({
      url: '/v1/appointment/doctor_work_info?doctor_id=' + doctor_id,
      method: 'GET',
      success(res) {
        var list = res.data.work_list;
        for (var i = 0; i < list.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          list[i]["order_time"] = getFormatTime(list[i]["order_time"], 'Y-M-D');
        }
        that.setData({
          doctor: res.data.doctor_info,
          work: list
        })
        wx.setNavigationBarTitle({
          title: res.data.doctor_info.name + "医生"
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
  //预约规则界面
  order_role: function () {
    wx.navigateTo({
      url: '/pages/doctor/orderRole/orderRole',
    })
  },
  appointment: function (e) {
    var id = e.currentTarget.id;
    var status = e.currentTarget.dataset.status
    var index = e.currentTarget.dataset.index;
    var that = this;
    var nums = that.data.work[index].order_use_num;

    if (status == 2) {
      wx.showModal({
        title: '提示',
        content: '当前日期，此医生已经预约挂号，不能重复预约',
      })
    } else if (status == 3) {
      wx.showModal({
        title: '提示',
        content: '当前日期，此医生挂号已满，请您重新选择日期或到其他医生挂号  ',
      })
    } else if (status == 4) {
      wx.showModal({
        title: '提示',
        content: '当前医生已暂停预约,不可预约挂号',
      })
    } else {
      wx.request({
        url: util.getBaseUrl() + '/v1/appointment/create_appointment',
        method: 'POST',
        data: {work_id: id},
        header: {
          'Content-Type': 'application/json',
          'device': wx.getStorageSync('device'),
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 200) {
            that.data.work[index].order_use_num = (nums + 1);
            that.data.work[index].status = 2;
            that.setData({
              work: that.data.work
            })

            wx.showModal({
              title: '预约挂号成功',
              showCancel: false,
              confirmText: "立即前往",
              content: '可在我的--我的预约查看',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          }
        }
      })
      
    }
  }
})