const path = require('path')

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsID
} = require('../constant/error.type')

const {
    createGoods,
    updateGoods,
    removeGoods,
    restoreGoods,
    findGoods
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

    // 下架商品
    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '商品下架成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }

    // 上架商品
    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '商品上架成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }

    // 获取商品列表
    async findAll(ctx) {
        // get请求参数在query中
        const { pageNum = 1, pageSize = 10} = ctx.request.query
        const res = await findGoods(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}


module.exports = new GoodsController()