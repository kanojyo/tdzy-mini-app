//index.js
//获取应用实例
let utils = require('../../utils/util.js');
import { getRequest } from '../../utils/util.js';
const app = getApp();
const baseUrl = utils.getBaseUrl();
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
    navScrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    imgUrls:[],
    officeList:[],
    hospital:[],
    doctorList:[],
    article: [],
    height: 0,
  },
  //轮播图点击跳转
  imageUrl: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: "/pages/banner/index?url=" + url,
    })
  },
  //我要咨询
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  //动态设置遮罩层的高度
  getHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.screenHeight;
        let clientWidth = res.screenWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
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
        'device': app.globalData.device,
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success(res) {
        wx.navigateTo({
          url: '/pages/user/sign/sign',
        })
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
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
              session: app.globalData.session_key,
              encryptData: res.encryptedData,
              iv: res.iv,
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'device': app.globalData.device,
            },
            success(e) {
              that.getIndex();
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

          }
        }
      });
    }
  },
  shouquan() {
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
                  session: app.globalData.session_key,
                  encryptData: res.encryptedData,
                  iv: res.iv,
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                  'device': app.globalData.device,
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
    //console.log(app.globalData.token)
    var that = this;
    that.getHeight();
    that.getIndex();
    that.shouquan();
  },
  onReady() {
  },
  onShow() {
    if (wx.getStorageSync('token')) {
      this.getIndex();
    }
  },
  onShareAppMessage(){
    return {
      title: '泰斗医聊首页',
      path: '/pages/index/index'
    }
  },
  substring: function (val, len) {
    if (val.length == 0 || val == undefined) {
      return false;
    } else if (val.length > len) {
      return val.substring(0, len) + "...";
    } else {
      return val;
    }
  },
  getIndex(){
    var that = this; 
    console.log('index')
    getRequest({
      url: '/v1/medical_info/index',
      method: 'GET',
      success(res) {
        var arr = res.data;
        // var office = [];
        for (var i = 0; i < arr.list_office.length; i ++ ) {
          arr.list_office[i].name = that.substring(arr.list_office[i].name, 6)
        }
        
        var flag = "";
        var showBox = "";
        var showStatus = true;
        if (arr.list_office.length <= 4) {
          flag = false;
          showBox = true;
          showStatus = false;
        }
        else if (arr.list_office.length > 4 && arr.list_office.length < 8) {
          flag = true;
          showBox = true;
        }
        else if (arr.list_office.length == 8) {
          flag = false;
          showBox = false;
          showStatus = false;
        } else {
          flag = true;
          showBox = false;
        }
        // var showStatus = "";

        // if (office.length > 1) {
        //   if (arr.list_office.length % 4 == 0) {
        //     showStatus = false;
        //     flag = false;
        //   } else {
        //     showStatus = true;
        //     flag = true;
        //   }
        // } else {
        //   showStatus = false;
        //   flag = false;
        // }
         
        that.setData({
          imgUrls: arr.banner,
          officeList: arr.list_office,
          hospital: arr.hospital,
          doctorList: arr.list_doctor,
          article: arr.list_hot_article,
          flag: flag,
          showBox: showBox,
          showStatus: showStatus
        })

      }
    })
  },
  showMoreOffice: function() {
    var that = this;
    that.setData({
      flag: false
    })
  },
  hideMoreOffice: function() {
    var that = this;
    that.setData({
      flag: true
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
  doctor_list: function () {
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
        'device': app.globalData.device,
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success(res) {
        if (!res.data.data.status) {
          wx.showModal({
            //title: '完善就诊人信息后才可以预约哦',
            showCancel: false,
            confirmText: "立即前往",
            confirmColor: "#d1b574",
            content: '完善就诊人信息后才可以预约哦',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/doctor/bind/index?id=' + doctor_id + "&page=order"
                })
              } else if (res.cancel) {
              }
            }
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
  hospitalLocation: function () {
    wx.navigateTo({
      url: "/pages/map/map"
    })
  },
  //跳转医院详情
  goHospital: function () {
    wx.navigateTo({
      url: "/pages/hospital/index"
    })
  },
  //跳转医生详情
  doctorInfo: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/doctor/info/index?doctor_id=" + id,
    })
  },
  //下拉加载新闻
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    var status = true;

    if (status) {
      wx.showLoading({
        title: '拼命加载中',
      });
      setTimeout(function () {
        wx.hideLoading();
        wx.request({
          url: baseUrl + '/v1/medical_info/hot_article?page_index=' + page + "&page_size=20",
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            'device': app.globalData.device,
            'Authorization': 'Bearer ' + app.globalData.token
          },
          success(res) {
            status = false;
            if (res.data.data.data.length > 0) {
              that.data.article = that.data.article.concat(res.data.data.data);
              if (res.data.data.data.length < 19) {
                that.setData({
                  bottomTitle: true,
                  title: '-- 我是有底线的 --',
                })
              } else {
                status = true;
              }

            } else {
              wx.showToast({
                title: '没有更多内容了',
                icon: 'none',
                duration: 2000
              })
              status = false;
            }

            that.data.page = that.data.page + 1;
            that.setData({
              article: that.data.article
            });
          }
        })
      }, 2000);
    }

  }
})