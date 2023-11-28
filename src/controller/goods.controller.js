const path = require('path')

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsID
} = require('../constant/error.type')

const {
    createGoods,
    updateGoods
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

    // 更新商品信息
    async update(ctx) {
        try { 
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '更新商品信息成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }
        } catch(err) {
            console.error(err)
        }
    }
}


module.exports = new GoodsController()