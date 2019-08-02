
App({
  data: {
    modal: false
  },
  onLaunch: function (option) {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('onlaunch');
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login')
        if (res.code) {
          wx.request({
            url: that.globalData.baseUrl + '/v1/login',
            data: {
              code: res.code
            },
            header: {
              'Content-Type': 'application/json',
            },
            success(e) {
              console.log('loginSuccess')

              var token = e.data.data.token;
              // console.log(token)
              that.globalData.token = token;
              that.globalData.session_key = e.data.data.session_key;
              //将token储存起来
              wx.setStorageSync('token', token)
              wx.setStorageSync('session_key', e.data.data.session_key)
              //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.tokenCallback) {
                that.tokenCallback(token);
              }
            }
          })

        }
      }
    })
  },
  
  // getToken: function() {
  //   console.log('gettoken')
  //   let that = this;
  //   return new Promise(function (resolve, reject) {
  //     wx.checkSession({
  //       success: function (res) { resolve(res); },
  //       fail: function (res) {
  //         wx.login({
  //           success: res => {
  //             // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //             console.log('login')
  //             if (res.code) {
  //               wx.request({
  //                 url: that.globalData.baseUrl + '/v1/login',
  //                 data: {
  //                   code: res.code
  //                 },
  //                 header: {
  //                   'Content-Type': 'application/json',
  //                 },
  //                 success(e) {
  //                   console.log('loginSuccess')
                    
  //                   var token = e.data.data.token;
  //                   console.log(token)
  //                   that.globalData.token = token;
  //                   that.globalData.session_key = e.data.data.session_key;
  //                   //将token储存起来
  //                   wx.setStorageSync('token', token)
  //                   wx.setStorageSync('session_key', e.data.data.session_key)
  //                   //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
  //                   // 所以此处加入 callback 以防止这种情况
  //                   if (that.tokenCallback) {
  //                     that.tokenCallback(token);
  //                   }
  //                 }
  //               })
               
  //             }
  //           }
  //         })
  //       }
  //     })
  //   })
  // },
  globalData: {
    userInfo: null,
    token:'',
    device:'',
    session_key:'',
    baseUrl:"https://tdxcx.wuhanlst.com",
  }
})