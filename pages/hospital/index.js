// pages/hospital/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      "https://apitest.wuhanlst.com:8013/media/20190420259e4e5ecb373f4235ae6452ecfbafc6",
      "https://apitest.wuhanlst.com:8013/media/20190420bebd4f49ccde3efbf6737f379bdd22f3",
      "https://apitest.wuhanlst.com:8013/media/201904200354e01778c5560924d4f26aea0443f0",
      "https://apitest.wuhanlst.com:8013/media/20190420b5042c9b1b3b140dc567151b5c63b1e8",
      "https://apitest.wuhanlst.com:8013/media/20190420f34da278ad83c759143aadcad5e25755"
    ],
  },
  imgYu: function (event) {
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: this.data.images[0], // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
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

  }
})