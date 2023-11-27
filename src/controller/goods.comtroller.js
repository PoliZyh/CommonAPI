const path = require('path')

const {
    fileUploadError
} = require('../constant/error.type')

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        if (file) {
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
}


module.exports = new GoodsController()