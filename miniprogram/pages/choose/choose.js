const app = getApp()
Page({
    data: {
        isGenerated: false,
        pixelRatio: 1
    },
    async onLoad() {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    pixelRatio: res.pixelRatio
                })
            }
        })
        const {
            borderUrl,
            cutImage
        } = app.globalData
        // console.log('globalData', app.globalData)
        if (cutImage != '') {
            this.setData({
                isGenerated: true
            })
        }
        const {
            canvas,
            ctx
        } = await this.initCanvas()
        this.canvas = canvas
        this.ctx = ctx
        //
        this.ctx.scale(this.data.pixelRatio, this.data.pixelRatio)
        this.canvas.width = this.canvas.width * this.data.pixelRatio
        this.canvas.height = this.canvas.width

        this.renderCanvas({
            borderUrl,
            cutImage
        })
    },
    async initCanvas() {
        return new Promise((resolve, reject) => {
            wx.createSelectorQuery().select("#canvas").fields({
                node: true,
                size: true
            }).exec((res) => {
                // console.log(res)
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')
                resolve({
                    canvas,
                    ctx
                })
            })
        })
    },
    async drawImage(props) {
        const {
            src
        } = props
        if (!this.canvas) throw new Error('no canvas')
        const img = this.canvas.createImage()
        img.src = src
        await new Promise((resolve, reject) => {
            img.onload = resolve
        })

        this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.canvas.width, this.canvas.height)

    },
    clearCanvas() {
        const {
            height,
            width
        } = this.canvas
        this.ctx.clearRect(0, 0, width, height)
    },
    async renderCanvas({
        clear = true,
        cutImage = app.globalData.cutImage,
        borderUrl = app.globalData.borderUrl
    }) {
        if (clear) this.clearCanvas()
        if (cutImage) {
            await this.drawImage({
                src: cutImage
            })
        }
        if (borderUrl) {
            await this.drawImage({
                src: borderUrl
            })
        }
    },
    chooseMedia() {
        wx.redirectTo({
            url: '../cropper/cropper',
        })
    },
    async saveAvatar() {
        if (!this.canvas) throw new Error('no canvas')
        const {
            tempFilePath: filePath
        } = await wx.canvasToTempFilePath({
            canvas: this.canvas,
        })
        this.setData({
            disableSaveAvatar: true
        })
        const res = await wx.saveImageToPhotosAlbum({
            filePath,
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