// pages/user/book/book.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    id:0,
    dataStaus: true,
    list1: [],//未就诊
    list2:[],//已就诊
    list3:[],//已取消,
    list1Parmas:{
      page_index:1,
      page_size:20
    },
    list2Parmas:{
      page_index:1,
      page_size:20
    },
    list3Parmas:{
      page_index:1,
      page_size:20
    },
    form_id: "",//表单ID
    page:"pages/user/book/bookingDetails/bookingDetails"//跳转回小程序个人中心我的预约页面
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    };
    if (e.target.dataset.current == 0){
      that.getList1();
    } else if (e.target.dataset.current == 1){
      that.getList2();
    } else if (e.target.dataset.current == 2){
      that.getList3();
    }
  },
  //未就诊
  getList1(){
    var that =this;
    getRequest({
      url: '/v1/my_appointment/list?status=1,4&page_index=' + that.data.list1Parmas.page_index +'&page_size=20',
      method: 'get',
      success: function (res) {
        that.setData({
          list1:res.data.data,
        });
        if (that.data.list1.length == 0){
          that.setData({
            dataStaus:false,
          })
        }
      }
    });
  },
  //已就诊
  getList2(){
    var that = this;
    getRequest({
      url: '/v1/my_appointment/list?status=2&page_index=' + that.data.list2Parmas.page_index +'&page_size=20',
      method: 'get',
      success: function (res) {
        that.setData({
          list2: res.data.data,
        })
      }
    });
  },
  //已取消
  getList3(){
    var that = this;
    getRequest({
      url: '/v1/my_appointment/list?status=3&page_index=' + that.data.list3Parmas.page_index + '&page_size=20',
      method:'get',
      success:function(res){
        that.setData({
          list3: res.data.data,
        })
      }
    });
  },
  //取消预约
  cancel(){
    var that =this;
    wx.request({
      url: utils.getBaseUrl()+'/v1/appointment/cancel_appointment',
      data:{
        appointment_id: that.data.id,
        form_id: that.data.form_id,
        page: that.data.page
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200){
          wx.showToast({
            title: '取消预约成功',
            icon: 'success',
            duration: 2000
          });
          that.getList1();//未就诊数据重新请求
          that.getList3();//已取消数据重新请求
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(res){

      }
    });
  },
  //跳转预约详情 
  getDetail(e){
    wx.navigateTo({
      url: 'bookingDetails/bookingDetails?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList1()
    this.getList2()
    this.getList3()
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
    var that = this;
    if (that.data.currentData == 0){
      var page = that.data.list1Parmas.page_index + 1;
      var status = true;
      if (status) {
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(() => {
          wx.hideLoading();
          getRequest({
            url: '/v1/my_appointment/list?status=1,4&page_index=' + page + '&page_size=20',
            method: 'GET',
            success(res) {
              status = false;
              if (res.data.data.length > 0) {
                that.data.list1Parmas.page_index = page;
                that.data.list1 = that.data.list1.concat(res.data.data);
                that.setData({
                  list1: that.data.list1,
                })
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }, 1000)
      }
    } 
    else if (that.data.currentData == 1) {
      var page = that.data.list2Parmas.page_index + 1;
      var status = true;
      if (status) {
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(() => {
          wx.hideLoading();
          getRequest({
            url: '/v1/my_appointment/list?status=2&page_index=' + page + '&page_size=20',
            method: 'GET',
            success(res) {
              status = false;
              if (res.data.data.length > 0) {
                that.data.list2Parmas.page_index = page;
                that.data.list2 = that.data.list2.concat(res.data.data);
                that.setData({
                  list2: that.data.list2,
                })
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }, 1000)
      }
    } 
    else if (that.data.currentData == 2) {
      var page = that.data.list3Parmas.page_index + 1;
      var status = true;
      if (status) {
        wx.showLoading({
          title: '拼命加载中',
        });
        setTimeout(() => {
          wx.hideLoading();
          getRequest({
            url: '/v1/my_appointment/list?status=3&page_index=' + page + '&page_size=20',
            method: 'GET',
            success(res) {
              status = false;
              if (res.data.data.length > 0) {
                that.data.list3Parmas.page_index = page;
                that.data.list3 = that.data.list3.concat(res.data.data);
                that.setData({
                  list3: that.data.list3,
                })
              } else {
                wx.showToast({
                  title: '没有更多内容了',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }, 1000)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) { 
    var page = 'pages/user/book/book';
    var form_id = e.detail.formId;
    var that = this;
    that.setData({
      id: e.currentTarget.id,
      form_id: form_id,
    })
    wx.showModal({
      title: '提示',
      content: '是否要取消当前日期预约挂号？',
      confirmColor: '#d1b574',
      success(res) {
        if (res.confirm) {
          //用户点击确定
          that.cancel();
        } else if (res.cancel) {
          //用户点击取消
        }
      }
    })
  }
})