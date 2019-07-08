Component({
  data: {
    "color": "#333",
    "selectedColor": "#d1b574",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/home_1@3x.png",
        "selectedIconPath": "../images/home_2@3x.png"
      },
      {
        "pagePath": "/pages/healthNews/healthNews",
        "text": "健康科普",
        "iconPath": "/images/morenPolularScience@3x_1.png",
        "selectedIconPath": "../images/morenPolularScience@3x_2.png"
      },
      {
        "pagePath": "/pages/chat/chat",
        "text": "在线问诊",
        "iconPath": "/images/Interrogation_1@3x.png",
        "selectedIconPath": "../images/Interrogation_2@3x.png"
      },
      {
        "pagePath": "/pages/user/user",
        "text": "我的",
        "iconPath": "/images/me_1@3x.png",
        "selectedIconPath": "/images/me_2@3x.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})