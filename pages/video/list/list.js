// pages/video/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        "id":1,
        "title":"常见中药材讲解1",
        "cover":"http://cswx-tdyl.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190722/20190722ecf1b8488a5d300595f23634fba9bfee.png",
        "time":"00:35"
      },
      {
        "id": 2,
        "title": "222常见中药材讲解12",
        "cover": "http://cswx-tdyl.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190722/20190722ecf1b8488a5d300595f23634fba9bfee.png",
        "time": "12:35"
      },
      {
        "id": 3,
        "title": "333常见中药材讲解12",
        "cover": "http://cswx-tdyl.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190722/20190722ecf1b8488a5d300595f23634fba9bfee.png",
        "time": "00:12:35"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  info: function(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/video/info/info?id=" + id,
    })
  }
})