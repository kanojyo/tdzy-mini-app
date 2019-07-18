const util = require('../../utils/util');
Page({
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
  onLoad: function(option) {
    console.log(option)
    var that = this;
    var url = option.path;
    console.log(url)
    that.setData({
      link: url
    })
  }
})