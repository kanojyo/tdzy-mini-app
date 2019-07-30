// pages/user/feedback/feedback.js
import { getRequest} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '',
    chatList: [],
    height:'',
    time:'',
    status:false,
    buttonClicked: false
  },
  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom() {
    var query = wx.createSelectorQuery().in(this);
    query.select('.chatList').boundingClientRect((rect)=> {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: 10000,
      })
    }).exec()
  },
  //获取意见反馈列表
  getList() {
    var that = this;
    getRequest({
      url: '/v1/feedback/index',
      method: 'GET',
      success(res) {
        that.setData({
          state: res.data.state,
          chatList:res.data.list,
          time: res.data.time,
        })
      }
    })
  },
  //提问、追问
  gotoUpload() {
    wx.redirectTo({
      url: 'upload/upload',
    })
  },
  //关闭
  close(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否要关闭？',
      confirmColor: '#d1b574',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          getRequest({
            url: '/v1/feedback/end',
            method: 'GET',
            success(res) {
              if (res.code === 200) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(() => {
                  that.setData({
                    status: true,
                  })
                }, 2000)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //预览;
  previewImg(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
    // this.pageScrollToBottom();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // onUnload: function () {
  //   wx.navigateBack({
  //     delta: 2
  //   })
  // },
  imageLoad(e){
    console.log(e)
  }
})