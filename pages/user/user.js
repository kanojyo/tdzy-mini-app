// pages/user/user.js
let utils = require('../../utils/util.js');
import { getRequest } from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    userInfo:{},
    telephone:'',
    newFeedBack:false,
    newMessage:0,
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
        that.setData({
          height: height
        });
      }
    });
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      // 获取到用户的信息了，打印到控制台上看下
      // console.log("用户的信息如下：");
      // console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.showTabBar();
      console.log('授权后')
      that.check();
      //获取基本资料
      that.getInfo();
      //是否消息中心有新消息
      that.hasMessage();
      wx.getUserInfo({
        success: function (res) {
          wx.request({
            url: utils.getBaseUrl() + '/v1/get_user_info',
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
                url: utils.getBaseUrl() + '/v1/get_user_info',
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
  //关于我们
  GotoAbout() {
    wx.navigateTo({
      url: 'about/index',
    })
  },
  //帮助中心
  GotoHelp() {
    wx.navigateTo({
      url: 'help/index',
    })
  },
  //跳转我的签到
  GotoInfo(){

    getRequest({
      url: '/v1/appointment/user_info_perfect',
      method: 'GET',
      success(res) {
        if (!res.data.status) {
          wx.navigateTo({
            url: '/pages/doctor/bind/index?id=0' + "&page=user",
          })
        } else {
          wx.navigateTo({
            url: 'info/info',
          })
        }
      }
    })
  },
  //跳转我的签到
  GotoSign(){
    wx.navigateTo({
      url: 'sign/sign',
    })
  },
  //跳转我的预约
  GotoBook(){
    wx.navigateTo({
      url: 'book/book',
    })
  },
  //跳转我的收藏
  GotoCollect(){
    wx.navigateTo({
      url: 'collect/collect',
    })
  },
  //跳转真伪查询
  GotoAuth(){
    wx.navigateTo({
      url: 'authenticity/authenticity',
    })
  },
  //跳转消息中心
  GotoMessage(){
    wx.navigateTo({
      url: 'message/message',
    })
  },
  //跳转意见反馈
  GotoFeedBack(){
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  //是否有未读的意见反馈
  check(){
    var that =this;
    getRequest({
      url:'/v1/feedback/unread',
      method:'GET',
      success(res){
        if (res.data.data ===1){
          //如果有新的未读意见反馈就改变状态；
          that.setData({
            newFeedBack:true,
          })
        } else if (res.data.data === 2){
          that.setData({
            newFeedBack: false,
          })
        }
      }
    })
  },
  //是否消息中心有新消息
  hasMessage(){
    var that =this;
    getRequest({
      url:'/v1/message/has_message',
      method:'GET',
      success(res){
        let num = res.data.msg_count;
        if (num>99){
          that.setData({
            newMessage:'99+',
          })
        }else{
          that.setData({
            newMessage: num,
          })
        }
      }
    })
  },
  getInfo(){
    var that =this;
    console.log('info')
    getRequest({
      url:'/v1/sign/my_info',
      method:'get',
      success(res){
        console.log('infoSuccess')
        that.setData({
          // telephone: res.data.mobile,
          userInfo: res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    if (app.globalData.token && app.globalData.token != '') {
        that.check();
        //获取基本资料
        that.getInfo();
        //是否消息中心有新消息
        that.hasMessage();
        that.getHeight();
        that.shouquan();
    } else {
      //由于请求是网络请求，可能会在Page.onLoad后才返回
      　　　//所以加入callback 防止这种情况
      app.tokenCallback = token => {
        if (token != '') {
          　　//执行操作。。
          that.check();
          //获取基本资料
          that.getInfo();
          //是否消息中心有新消息
          that.hasMessage();
          that.getHeight();
          that.shouquan();
        }
      }
    }
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
    var that = this;
    this.check();
    this.hasMessage();
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
  formSubmit: function (e) {
    var page = 'pages/user/sign/sign';
    var form_id = e.detail.formId;
    wx.request({
      url: utils.getBaseUrl() + '/v1/sign/sign_up',
      method: 'POST',
      data:{
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
          url: 'sign/sign',
        })
       
      }
    })
    
  }
})