// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
  },
  toSelect() {
    wx.navigateTo({
      url: '../select/select'
    })
  },
  onShareAppMessage() {
    return {
      title: '华中大70周年校庆云打卡',
      path: '/pages/index/index',
      imageUrl: 'http://cdn.danmoits.com/new-index.jpg',
    }
  },
  onShareTimeline() {
    return {
      title: '华中大70周年校庆云打卡',
      path: '/pages/index/index',
      imageUrl: 'http://cdn.danmoits.com/new-index.jpg',
    }
  }
})