// pages/select/select.ts
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrlArr: [
            'http://cdn.danmoits.com/b-ag.png',
            'http://cdn.danmoits.com/b-dj1.png',
            'http://cdn.danmoits.com/b-dj2.png',
            'http://cdn.danmoits.com/b-nyl1.png',
            'http://cdn.danmoits.com/b-nyl2.png',
            'http://cdn.danmoits.com/b-ball.png',
            'http://cdn.danmoits.com/b-xse1.png',
            'http://cdn.danmoits.com/b-xse2.png',
            'http://cdn.danmoits.com/b-xsg.png',
            'http://cdn.danmoits.com/b-zwt.png',
            'http://cdn.danmoits.com/hs-spring.png',
            'http://cdn.danmoits.com/hs-summer.png',
            'http://cdn.danmoits.com/hs-fall.png',
            'http://cdn.danmoits.com/hs-winter.png',
            'http://cdn.danmoits.com/s-spring.png',
            'http://cdn.danmoits.com/s-summer.png',
            'http://cdn.danmoits.com/s-fall.png',
            'http://cdn.danmoits.com/s-winter.png',
            'http://cdn.danmoits.com/a-cat.png',
            'http://cdn.danmoits.com/a-wt.png',
            'http://cdn.danmoits.com/a-pig.png',
            'http://cdn.danmoits.com/a-yx.png',
        ],
        circleImgUrlArr: [
            'http://cdn.danmoits.com/ccircle1.png',
            'http://cdn.danmoits.com/ccircle2.png',
            'http://cdn.danmoits.com/ccircle3.png',
            'http://cdn.danmoits.com/ccircle4.png',
            'http://cdn.danmoits.com/ccircle5.png',
        ],
        squareImgUrlArr: [
            'http://cdn.danmoits.com/square1.png',
            'http://cdn.danmoits.com/square2.png',
            'http://cdn.danmoits.com/square3.png',
            'http://cdn.danmoits.com/square4.png',
            'http://cdn.danmoits.com/square5.png',
        ],
        borderUrl: 'http://cdn.danmoits.com/ccircle1.png',
        // 是否滑到顶部
        isScrollUp: true,
        // 点击的是圆形/方形头像框
        type: 0,
    },
    toCropper() {
        wx.navigateTo({
            url: '../cropper/cropper',
            success: res => {
                // console.log(this.data.borderUrl)
                // res.eventChannel.emit('getBorderUrl', this.data.borderUrl)
            }
        })
    },
    toCropperSquare() {
        wx.navigateTo({
            url: '../cropper_square/cropper_square',
        })
    },
    toWhere() {
        if (this.data.type === 0) {
            this.toCropper()
        } else if (this.data.type === 1) {
            this.toCropperSquare()
        }
    },
    selectBorder(e) {
        this.setData({
            borderUrl: e.target.dataset.url
        })
        // 设置全局变量
        getApp().globalData.borderUrl = e.target.dataset.url
        // console.log(this.data)
    },
    setCircle(e) {
        this.selectBorder(e)
        this.setData({
            type: 0
        })
    },
    setSquare(e) {
        this.selectBorder(e)
        this.setData({
            type: 1
        })
    },
    scrollUp() {
        this.setData({
            isScrollUp: true
        })
        // console.log('up')
    },
    scrollDown() {
        this.setData({
            isScrollUp: false
        })
        // console.log('down')
    },
    onShareAppMessage() {
        return {
            title: '华中大70周年校庆云打卡',
            path: '/pages/index/index',
            imageUrl: 'http://cdn.danmoits.com/new-index.jpg',
        }
    },
    test() {
        // console.log(1)
        console.log(this.data.type)
    }
})