// pages/user/sign/detail/detail.js
const utils = require('../../../../utils/util.js') ;
import { getRequest } from '../../../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    id:0,
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    menuTapCurrent: 0,
    img:[
      "http://tdxcx.wuhanlst.com:8899/media/2019052861d6073b407668483e0b09b049e0dd38",
      "http://tdxcx.wuhanlst.com:8899/media/2019052846bc23a69bf1c83da6d4a82f14531d9e",
      "http://tdxcx.wuhanlst.com:8899/media/2019052878007161d3649dce7817cb020af0d0ec"
    ]
  },
  // 点击按钮选项卡切换
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
  },
  getMyscore: function() {
    var that = this;
    getRequest({
      url: '/v1/sign/sign_up',
      method: 'POST',
      success(res) {
        console.log(res.data)
        that.setData({
          myScore: res.data.user.score
        })
      }
    })
  },
  //获取热门兑换详情
  getGoods(){
    var that = this;
    getRequest({
      url: '/v1/sign/hot_exchange_info?goods_id=' + that.data.id,
      method:'GET',
      success(res){
        res.data.goods_rules = res.data.goods_rules.replace(/\\n/g, "\n")
        console.log(res.data)
        that.setData({
          goods:res.data
        })
      }
    })
  },
  //兑换
  exchange(){
    var that =this;
    wx.showModal({
      title: '提示',
      content: '确定要兑此积分商品？',
      confirmColor: '#d1b574',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          wx.request({
            url: utils.getBaseUrl() +'/v1/sign/exchange',
            method:'POST',
            data:{
              goods_id: that.data.id
            },
            header: {
              'Content-Type': 'application/json',
              'device': app.globalData.device,
              'Authorization': 'Bearer ' + app.globalData.token
            },
            success(res){
              if(res.data.code ===200){
                wx.showModal({
                  title: '兑换成功',
                  content: '可在我的--签到--我的积分查看',
                  showCancel:false,
                  confirmText:'立即前往',
                  confirmColor: '#d1b574',
                  success(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../score/score'
                      })
                    }
                  }
                })
              }else if(res.data.code == 400){
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 1500
                });
                // setTimeout(() => {
                //   wx.redirectTo({
                //     url: '../../sign/sign'
                //   })
                // }, 1500)
              }
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.hideShareMenu();
    var that = this;
    that.setData({
      id: options.id
    })
    //获取详情
    this.getGoods();
    that.getMyscore();
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

  }
})