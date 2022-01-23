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
  }
})
