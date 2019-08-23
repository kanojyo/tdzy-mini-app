// pages/user/sign/detail/detail.js
const utils = require('../../../../utils/util.js') ;
import { getRequest } from '../../../../utils/util.js';

const getCurrentPageUrlWithArgs = () => {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: "",
    id:0,
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    menuTapCurrent: 0,
    current:0
  },
  swiperChange: function (event) {
    var that = this;
    var current = event.detail.current;

    that.setData({
      current:current
    })
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
  getGoods: function(id) {
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: utils.getBaseUrl() + '/v1/sign/hot_exchange_info?goods_id=' + id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      success(res) {
        //res.data.goods_rules = res.data.goods_rules.replace(/\\n/g, "\n")
        console.log(res.data)
      
        that.data.goods =  res.data
        
      }
    })
    // getRequest({
    //   url: '/v1/sign/hot_exchange_info?goods_id=' + that.data.id,
    //   method:'GET',
    //   success(res){
    //     res.data.goods_rules = res.data.goods_rules.replace(/\\n/g, "\n")
    //     console.log(res.data)
    //     that.setData({
    //       goods:res.data
    //     })
    //   }
    // })
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
    setTimeout(function() {
      console.log(1)
    }, 1000)
    var that = this;
    var id = options.id
    
    //获取详情
    var token = wx.getStorageSync('token');
    var goods = [];
    wx.request({
      url: utils.getBaseUrl() + '/v1/sign/hot_exchange_info?goods_id=' + id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      success(res) {
        console.log(res.data)
        //res.data.goods_rules = res.data.goods_rules.replace(/\\n/g, "\n")
        that.data.goods = res.data
        
      }
    })
    console.log(that.data.goods + 'kkk')
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
    return {
      title: that.data.goods.goods_name,
      desc: "",
      path: getCurrentPageUrlWithArgs(),
      success: function (res) {

      }
    }
  },
  previewImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var imgArr = that.data.goods.goods_loop;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})