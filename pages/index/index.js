//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    officeList:[
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/male@2x.png",
        "text":"男科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/breast@2x.png",
        "text":"乳腺科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/rhinitis@2x.png",
        "text":"鼻炎科"
      },
      {
        "img":"https://whmycs.oss-cn-hangzhou.aliyuncs.com/applet/index/anorectal@2x.png",
        "text":"肛肠科"
      }
    ]
  },
  onLoad: function () {
    
  },
})
