const path = require('path')

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError
} = require('../constant/error.type')

const {
    createGoods
} = require('../service/goods.service')

class GoodsController {
    // 上传图片
    async upload(ctx, next) {
        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png']
        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                msg: '上传成功',
                result: {
                    good_img: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    // 创建/发布商品
    async create(ctx) {
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch(err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
        
    }
}


module.exports = new GoodsController()