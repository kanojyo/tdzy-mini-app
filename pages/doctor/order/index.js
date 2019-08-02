// pages/doctor/order/index.js
const util = require('../../../utils/util');
import { getRequest } from '../../../utils/util.js';
const app = getApp();

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
    flag: true,
    info: {},
    status: true,
    state: 0
  },
  showBox: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
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
  
  show: function (e) {
    this.setData({ flag: false })
    var index = e.currentTarget.dataset.index;
    var that = this;
    var state = e.currentTarget.dataset.status;
    that.data.info.order_time = that.data.work[index].order_time;
    that.data.info.week_day = that.data.work[index].week_day;
    that.data.info.time_slot = that.data.work[index].time_slot;
    that.data.info.work_id = that.data.work[index].id;
    that.data.info.index = index;
    getRequest({
      url: '/v1/sign/my_info',
      method: 'GET',
      success(res) {
        that.setData({
          userinfo: res.data,
          state: state
        })
      }
    })

    that.setData({
      info: that.data.info
    })
  },
  // 当遮罩层与conts区域出现时，执行hide,flag变为true，遮罩层与conts区域再次被隐藏
  hide: function () {
    this.setData({ flag: true })
  },
  formSubmit: function (e) { 
    var that = this;
    var page = 'pages/user/book/bookingDetails/bookingDetails';
    var form_id = e.detail.formId;
    var id = e.currentTarget.id;
    var state = that.data.state
    var index = e.currentTarget.dataset.index;
    var nums = that.data.work[index].order_use_num;
    
    if (state == 2) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生已经预约挂号，不能重复预约',
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {
          }
        }
      })
    } else if (state == 3) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生挂号已满，请您重新选择日期或到其他医生挂号',
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {
          }
        }
      })
    } else if (state == 4) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生已暂停预约,不可预约挂号',
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {
          }
        }
      })
    } 
    else {
      that.setData({
        status: false
      })
      wx.request({
        url: util.getBaseUrl() + '/v1/appointment/create_appointment',
        method: 'POST',
        data: { work_id: id, page: page, form_id: form_id },
        header: {
          'Content-Type': 'application/json',
          'device': app.globalData.device,
          'Authorization': 'Bearer ' + app.globalData.token
        },
        success(res) {
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
              confirmColor:"#d1b574",
              content: '可在我的--我的预约查看',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/user/book/book',
                  })
                } else if (res.cancel) {
                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              confirmText: "知道了",
              confirmColor: "#d1b574",
              content: res.data.message,
              success: function (res) {
                if (res.confirm) {

                } else if (res.cancel) {
                }
              }
            })
          }

          that.setData({
            status: true,
            flag: true
          })
        }
      })

    }
  },
  tips: function(e) {
    var status = e.currentTarget.dataset.status;

    if (status == 2) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生已经预约挂号，不能重复预约',
        success: function (res) {
          if (res.confirm) {
           
          } else if (res.cancel) {
          }
        }
      })
    } else if (status == 3) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生挂号已满，请您重新选择日期或到其他医生挂号',
        success: function (res) {
          if (res.confirm) {
            
          } else if (res.cancel) {
          }
        }
      })
    } else if (status == 4) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#d1b574",
        content: '当前日期，此医生已暂停预约,不可预约挂号',
        success: function (res) {
          if (res.confirm) {
            
          } else if (res.cancel) {
          }
        }
      })
    } 
  }
})