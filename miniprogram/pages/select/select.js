// pages/select/select.ts
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // imgUrlArr: [
        //     'http://cdn.danmoits.com/b-ag.png',
        //     'http://cdn.danmoits.com/b-dj1.png',
        //     'http://cdn.danmoits.com/b-dj2.png',
        //     'http://cdn.danmoits.com/b-nyl1.png',
        //     'http://cdn.danmoits.com/b-nyl2.png',
        //     'http://cdn.danmoits.com/b-ball.png',
        //     'http://cdn.danmoits.com/b-xse1.png',
        //     'http://cdn.danmoits.com/b-xse2.png',
        //     'http://cdn.danmoits.com/b-xsg.png',
        //     'http://cdn.danmoits.com/b-zwt.png',
        //     'http://cdn.danmoits.com/hs-spring.png',
        //     'http://cdn.danmoits.com/hs-summer.png',
        //     'http://cdn.danmoits.com/hs-fall.png',
        //     'http://cdn.danmoits.com/hs-winter.png',
        //     'http://cdn.danmoits.com/s-spring.png',
        //     'http://cdn.danmoits.com/s-summer.png',
        //     'http://cdn.danmoits.com/s-fall.png',
        //     'http://cdn.danmoits.com/s-winter.png',
        //     'http://cdn.danmoits.com/a-cat.png',
        //     'http://cdn.danmoits.com/a-wt.png',
        //     'http://cdn.danmoits.com/a-pig.png',
        //     'http://cdn.danmoits.com/a-yx.png',
        // ],
        imgUrlArr: [
            '../../imgs/b-ag.png',
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
        borderUrl: '../../imgs/b-ag.png',
        // 是否滑到顶部
        isScrollUp: true,
    },
    toChoose() {
        wx.navigateTo({
            // url: '../choose/choose',
            url: '../cropper/cropper',
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
        // console.log(this.data)
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
    },
    onShareAppMessage() {
        return {
            title: '华中大虎年新春头像框',
            path: '/pages/index/index',
            imageUrl: '../../imgs/index.jpg'
        }
    },
})