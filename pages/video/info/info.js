// pages/video/info/info.js
let utils = require('../../../utils/util.js');
import { getRequest } from '../../../utils/util.js';

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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoimage: "block" //默认显示封面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id  = options.id;
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.setData({
          height: (height - 542) / 4
        })
      },
    });
    getRequest({
      url: '/v1/video/info?id=' + id,
      method: 'get',
      success: function (res) {
        //console.log(res.data)
        that.setData({
          info: res.data,
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
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
      title: that.data.info.title,
      desc: "",
      path: getCurrentPageUrlWithArgs(),
      success: function (res) {

      }
    }
  },
  //点击播放按钮，封面图片隐藏,播放视频
  bindplay: function (e) {
    this.setData({
      tab_image: "none"
    }),
    this.videoCtx.play()
  },
})