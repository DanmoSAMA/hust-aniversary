const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
    data: {
        src: '',
        width: 280, //宽度
        height: 186.7, //高度
        max_width: 400,
        max_height: 400,
        disable_rotate: true, //是否禁用旋转
        disable_ratio: true, //锁定比例
        limit_move: true, //是否限制移动
        quality: 0,
        disable: false,
    },
    onLoad: function (options) {
        this.cropper = this.selectComponent('#image-cropper')
        this.cropper.upload() //上传图片
    },
    cropperload(e) {
        console.log('cropper加载完成')
    },
    loadimage(e) {
        wx.hideLoading()
        this.cropper.imgReset()
    },
    clickcut(e) {
        console.log(e.detail)
        //图片预览
        wx.previewImage({
            current: e.detail.url, // 当前显示图片的http链接
            urls: [e.detail.url], // 需要预览的图片http链接列表
        })
    },
    upload() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths[0]
                console.log('tempFilePath', tempFilePaths)
                that.cropper.imgReset()

                that.setData({
                    src: tempFilePaths,
                })
                //重置图片角度、缩放、位置
            },
        })
    },
    submit() {
        const that = this
        if (this.data.disable) return
        else {
            this.setData({
                disable: true,
            })
            this.cropper.getImg((obj) => {
                this.originPic = obj.url
                wx.showLoading({
                    title: '上传中',
                    loading: 4000,
                    success: () => {
                        app.globalData.cutImage = obj.url
                        wx.redirectTo({
                            url: '../choose_square/choose_square',
                        })
                    },
                })

                wx.getImageInfo({
                    src: obj.url,
                    success: function (res) {
                        var canvasWidth = res.width //图片原始长宽
                        var canvasHeight = res.height
                        var ratio = 2
                        while (canvasWidth > 50 || canvasHeight > 50) {
                            // 保证宽高在400以内
                            canvasWidth = Math.trunc(res.width / ratio)
                            canvasHeight = Math.trunc(res.height / ratio)
                            ratio++
                        }
                        that.setData({
                            cWidth: canvasWidth,
                            cHeight: canvasHeight,
                        })
                        // console.log('picInfo', canvasWidth, canvasHeight)
                        that.getCanvasImg(
                            obj.url,
                            canvasWidth,
                            canvasWidth,
                            that.data.quality,
                            function (res) {

                            }
                        )
                    },
                })
            })
        }
    },
    rotate() {
        //在用户旋转的基础上旋转90°
        this.cropper.setAngle(this.cropper.data.angle -= 90);
    },
    //质量压缩
    getCanvasImg(tempFilePath, canvasWidth, canvasHeight, quality, callback) {
        var that = this
        const ctx = wx.createCanvasContext('attendCanvasId')
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.drawImage(tempFilePath, 0, 0, canvasWidth, canvasHeight)
        ctx.draw(
            false,
            setTimeout(function () {
                wx.canvasToTempFilePath({
                    canvasId: 'attendCanvasId',
                    fileType: 'jpg',
                    quality: 0,
                    success: function success(res) {
                        callback && callback(res)
                    },
                    fail: function (e) {
                        // wx.showToast({
                        //     title: '图片上传失败，请重新上传！',
                        //     icon: 'none',
                        // })
                    },
                })
            }),
            100
        )
    },
    base64({
        url,
        type
    }) {
        return new Promise((resolve, reject) => {
            wx.getFileSystemManager().readFile({
                filePath: url, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: (res) => {
                    resolve(
                        'data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data
                    )
                },
                fail: (res) => reject(res.errMsg),
            })
        })
    },
    onShareAppMessage() {
        return {
            title: '华中大70周年校庆云打卡',
            path: '/pages/index/index',
            imageUrl: 'http://cdn.danmoits.com/new-index.jpg',
        }
    },
})