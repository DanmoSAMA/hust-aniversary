// pages/choose/choose.ts
// 获取应用实例
const app = getApp()
let ctx = null
Page({
    data: {
        // 用户是否选择头像
        isAvatarChosen: false,
        // 用户是否预览了头像(即新的头像是否生成)
        isGenerated: false,
        // 头像框url
        borderUrl: '',
        // 头像url
        avatarUrl: '',
        // 像素比，防止图片模糊
        pixelRatio: 1,
        // canvas
        canvas: null,
        // ctx
        ctx: null
    },
    onLoad() {
        this.setData({borderUrl: app.globalData.borderUrl, avatarUrl: app.globalData.cutImage})
        console.log(this.data)
        // const eventChannel = this.getOpenerEventChannel()
        // eventChannel.on("getBorderUrl", data => {
        //     this.setData({
        //         borderUrl: data
        //     })
        // })
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    pixelRatio: res.pixelRatio
                })
            }
        })
        wx.createSelectorQuery()
            .select('#canvas')
            .fields({
                node: true,
                size: true,
            })
            .exec(res => {
                // 绘制边框
                const canvas = res[0].node
                ctx = canvas.getContext('2d')
                this.setData({
                    canvas,
                    ctx
                })
                const ratio = this.data.pixelRatio
                ctx.scale(ratio, ratio)
                setTimeout(() => {
                    this.draw({url: this.data.borderUrl, dx: 0, dy: 0, dWidth: canvas.width, dHeight: canvas.height})
                }, 100)
            })
    },
    // 加载图片
    loadImage(url) {
        const canvas = this.data.canvas
        return new Promise((resolve, reject) => {
            const img = canvas.createImage()
            img.onload = () => resolve(img)
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = url
        })
    },
    // 绘制图片
    draw(options) {
        const canvas = this.data.canvas
        const ctx = this.data.ctx
        const ratio = this.data.pixelRatio
        const myOptions = Object.assign({}, options);
        ctx.scale(ratio, ratio)
        return this.loadImage(myOptions.url).then(img => {
            const imgScale = img.width / img.height
            canvas.width = canvas.width * ratio
            canvas.height = canvas.width / imgScale
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
            // ctx.drawImage(img, 0, 0, img.width, img.height, myOptions.dx, myOptions.dy, myOptions.dWidth, myOptions.dHeight)
        })
    },
    // 选择图片
    // chooseImg() {
    //     wx.chooseMedia({
    //         count: 1,
    //         mediaType: ['image'],
    //         sourceType: ['album'],
    //         success: res => {
    //             this.setData({
    //                 isAvatarChosen: true,
    //                 avatarUrl: res.tempFiles[0].tempFilePath,
    //                 isGenerated: false
    //             })
    //         }
    //     }) 
    // },
    chooseImg() {
        wx.redirectTo({
          url: '../cropper/cropper',
        })
    },
    // 预览图片(生成头像)
    async generateAvatar() {
        const canvas = this.data.canvas
        if (this.data.avatarUrl != '') {
            await this.draw({url: this.data.avatarUrl, dx: 0, dy: 0, dWidth: canvas.width, dHeight: canvas.height})
            // await this.draw({url: this.data.borderUrl, dx: 0, dy: 0, dWidth: canvas.width, dHeight: canvas.height})
            setTimeout(() =>{
                this.draw({url: this.data.borderUrl, dx: 0, dy: 0, dWidth: canvas.width, dHeight: canvas.height})
            }, 200)
            this.setData({isGenerated: true})
        } else {
            wx.showToast({
                title: '请先选择图片',
                icon: 'none',
                duration: 2000,
              })
            return
        }
    },
    // 下载图片
    downloadAvatar() {

    },
})