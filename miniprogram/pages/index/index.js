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
      title: '华中大虎年新春头像框',
      path: '/pages/index/index',
      imageUrl: '../../imgs/index.jpg'
    }
  },
  onShareTimeline() {
    return {
      title: '华中大虎年新春头像框',
      path: '/pages/index/index',
      imageUrl: '../../imgs/index.jpg'
    }
  }
})