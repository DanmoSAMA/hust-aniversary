// pages/select/select.ts
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        circleImgUrlArr: [
            '../../imgs/circle1.png',
            '../../imgs/circle2.png',
            '../../imgs/circle3.png',
            '../../imgs/circle4.png',
            '../../imgs/circle5.png',
        ],
        squareImgUrlArr: [
            '../../imgs/square1.png',
            '../../imgs/square2.png',
            '../../imgs/square3.png',
            '../../imgs/square4.png',
            '../../imgs/square5.png',
        ],
        borderUrl: '../../imgs/b-ag.png',
        // 是否滑到顶部
        isScrollUp: true,
        // 点击的是圆形/方形头像框
        type: -1,
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
            title: '华中大虎年新春头像框',
            path: '/pages/index/index',
            imageUrl: '../../imgs/index.jpg'
        }
    },
    test() {
        // console.log(1)
        console.log(this.data.type)
    }
})