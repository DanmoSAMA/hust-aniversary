// pages/select/select.ts
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrlArr: ['../../imgs/b-ag.png',
            '../../imgs/b-dj1.png',
            '../../imgs/b-dj2.png',
            '../../imgs/b-nyl1.png',
            '../../imgs/b-nyl2.png',
            '../../imgs/b-ball.png',
            '../../imgs/b-xse1.png',
            '../../imgs/b-xse2.png',
            '../../imgs/b-xsg.png',
            '../../imgs/b-zwt.png',
            '../../imgs/hs-spring.png',
            '../../imgs/hs-summer.png',
            '../../imgs/hs-fall.png',
            '../../imgs/hs-winter.png',
            '../../imgs/s-spring.png',
            '../../imgs/s-summer.png',
            '../../imgs/s-fall.png',
            '../../imgs/s-winter.png',
            '../../imgs/a-cat.png',
            '../../imgs/a-wt.png',
            '../../imgs/a-pig.png',
            '../../imgs/a-yx.png',
        ],
        borderUrl: app.globalData.borderUrl != '' ? app.globalData.borderUrl : '../../imgs/b-ag.png',
        // 是否滑到顶部
        isScrollUp: true,
    },
    toChoose() {
        wx.navigateTo({
            url: '../choose/choose',
            success: res => {
                // console.log(this.data.borderUrl)
                // res.eventChannel.emit('getBorderUrl', this.data.borderUrl)
            }
        })
    },
    selectBorder(e) {
        this.setData({
            borderUrl: e.target.dataset.url
        })
        // 设置全局变量
        getApp().globalData.borderUrl = e.target.dataset.url
    },
    scrollUp() {
        this.setData({
            isScrollUp: true
        })
    },
    scrollDown() {
        this.setData({
            isScrollUp: false
        })
    }
})