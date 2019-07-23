// pages/user/message/message.js
import { getRequest } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataStatus:false,
    messageList: [],
    page_index: 1,
    page_size: 20,
  },
  //系统消息列表
  getData() {
    var that = this;
    getRequest({
      url: '/v1/message/sys_msg_list?page_index=' + that.data.page_index + '&page_size=' + that.data.page_size,
      method: 'GET',
      success(res) {
        that.setData({
          messageList: res.data.data,
          dataStatus:true,
        })
      }
    })
  },
  goTo(e){
    console.log(e.currentTarget.dataset.id)
    getRequest({
      url: '/v1/message/read_system_msg?msg_system_id=' + e.currentTarget.dataset.id ,
      method: 'GET',
      success(res) {
        if (res.data.status == 1){
          wx.navigateTo({
            url: 'messageDetail/messageDetail?url=' + e.currentTarget.dataset.url,
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    var page = that.data.page_index + 1;
    var status = true;
    if (status) {
      wx.showLoading({
        title: '拼命加载中',
      });
      setTimeout(() => {
        wx.hideLoading();
        getRequest({
          url: '/v1/message/sys_msg_list?page_index=' + page + '&page_size=' + that.data.page_size,
          method: 'GET',
          success(res) {
            status = false;
            if (res.data.data.length > 0) {
              that.messageList = that.messageList.concat(res.data.data);
              that.setData({
                list: that.messageList,
                page_index: page,
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})