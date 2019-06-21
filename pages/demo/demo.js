// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    article: [
      {
        "id": 114,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190402/20190402c5de9b1bbb0da1e6c8e0d1d54242c861.jpg",
        "category_id": 63,
        "article_tag": "痔疮科",
        "article_title": "24",
        "article_description": "测试",
        "article_url": "http://192.168.0.123:8012/info/114.html",
        "status": 2
      },
      {
        "id": 37,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190318/201903183909b0addfdfc15aceed0ceaa03337da.jpg",
        "category_id": 30,
        "article_tag": "痔疮科,心脏科",
        "article_title": "几乎所有人脸上都有的生物：蠕形螨1",
        "article_description": "本文译自 Funfactz，由译者 HTT110 基于创作共用协议(BY-NC)发布。1",
        "article_url": "http://192.168.0.123:8012/info/37.html",
        "status": 2
      },
      {
        "id": 114,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190402/20190402c5de9b1bbb0da1e6c8e0d1d54242c861.jpg",
        "category_id": 63,
        "article_tag": "痔疮科",
        "article_title": "24",
        "article_description": "测试",
        "article_url": "http://192.168.0.123:8012/info/114.html",
        "status": 2
      },
      {
        "id": 37,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190318/201903183909b0addfdfc15aceed0ceaa03337da.jpg",
        "category_id": 30,
        "article_tag": "痔疮科,心脏科",
        "article_title": "几乎所有人脸上都有的生物：蠕形螨1",
        "article_description": "本文译自 Funfactz，由译者 HTT110 基于创作共用协议(BY-NC)发布。1",
        "article_url": "http://192.168.0.123:8012/info/37.html",
        "status": 2
      },
      {
        "id": 114,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190402/20190402c5de9b1bbb0da1e6c8e0d1d54242c861.jpg",
        "category_id": 63,
        "article_tag": "痔疮科",
        "article_title": "24",
        "article_description": "测试",
        "article_url": "http://192.168.0.123:8012/info/114.html",
        "status": 2
      },
      {
        "id": 37,
        "article_cover": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190318/201903183909b0addfdfc15aceed0ceaa03337da.jpg",
        "category_id": 30,
        "article_tag": "痔疮科,心脏科",
        "article_title": "几乎所有人脸上都有的生物：蠕形螨1",
        "article_description": "本文译自 Funfactz，由译者 HTT110 基于创作共用协议(BY-NC)发布。1",
        "article_url": "http://192.168.0.123:8012/info/37.html",
        "status": 2
      },
    ]
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
    }
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