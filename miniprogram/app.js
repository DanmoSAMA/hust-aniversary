// app.js
App({
  globalData: {
    borderUrl: 'http://cdn.danmoits.com/ccircle1.png',
    cutImage: '',
  },
  onLaunch: async function () {
    wx.cloud.init({})
    const res = await wx.cloud.callContainer({
      config: {
        env: 'prod-3gcd09hbc346c14e', // 微信云托管环境ID
      },
      path: '/',
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'demo',
      }
    })
    console.log(res); // 在控制台里查看打印
  }
})