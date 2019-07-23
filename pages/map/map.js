//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: 0,
    latitude: 0,
    speed: 0,
    accuracy: 0
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
    wx.getLocation({
      type: 'wgs84',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.5078120000,//要去的纬度-地址
          longitude: 114.3646580000,//要去的经度-地址
          name: "泰斗中医院",
          address: '洪山区雄楚大街428号'
        })

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })

        
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
  },
})
