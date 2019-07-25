// pages/user/feedback/upload/upload.js
let utils = require('../../../../utils/util.js');
import { getRequest } from '../../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    describe:'',
    url:[],
    num:0,
  },
  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res)
        // console.log(res.tempFilePaths)
        // console.log(typeof(res.tempFilePaths))
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '加载中',
        })
        wx.uploadFile({
          url: utils.getBaseUrl()+'/v1/uploads', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            wx.hideLoading()
            let imgData = JSON.parse(res.data);
            let imgUrl = imgData.data.url;
            //上传图片的数组
            that.data.url.push({ url: imgUrl})
            that.setData({
              //前端显示上传图片的数组
              files: that.data.files.concat(imgUrl)
            });
            console.log(that.data.files)
          }
        })
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //textarea双向绑定
  updateValue(e){
    var that =this;
    that.setData({
      describe: e.detail.value,
      num: e.detail.value.length
    })
  },
  //提交反馈
  submit(){
    var that =this;
    wx.request({
      url: utils.getBaseUrl() +'/v1/feedback/add',
      data:{
        describe: that.data.describe,
        image: that.data.url
      },
      method:'POST',
      header: {
        'Content-Type': 'application/json',
        'device': wx.getStorageSync('device'),
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        console.log(res)
        if(res.data.code==200){
          wx.redirectTo({
            url:'../feedback'
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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