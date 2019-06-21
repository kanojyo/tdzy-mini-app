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
    ],
    doctorList:[
      {
        "id": 6,
        "name": "泰斗中医",
        "avatar": "http://taidouapp-cs.oss-cn-hangzhou.aliyuncs.com/tdzy/file/20190329/201903293e896dc4ed2a44d5974b0e718a3a6df0.png",
        "position": "主治医生",
        "brief": "测试医生哦，你值得拥有！",
        "label": [
          "666",
          "医生大佬",
          "测试"
        ],
        "keshi": "补肾科",
        "link_url": "http://osscdn.whtdzyy.com/web/minyisheng/index.html"
      },
      {
        "id": 5,
        "name": "医生唐燉俊",
        "avatar": "https://cdn-statis.mangguokandian.com/avatar.png",
        "position": "主治医生",
        "brief": "这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介这是医生简介",
        "label": [
          "专注男科30年",
          "著名医生"
        ],
        "keshi": "补肾科",
        "link_url": "http://osscdn.whtdzyy.com/web/minyisheng/index.html"
      }
    ],
    article:[
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
  onLoad: function () {
    
  },
})
