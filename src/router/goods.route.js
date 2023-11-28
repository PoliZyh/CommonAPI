const Router = require('koa-router')

const { 
    upload
} = require('../controller/goods.comtroller')

const { 
    auth,
    hasAdminPermission 
} = require('../middleware/auth.middleware')

const {
    validator
} = require('../middleware/goods.middleware')

const router = new Router({
    prefix: '/goods'
})


// 商品图片上传接口
router.post('/upload', auth, hasAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hasAdminPermission, validator, (ctx) => {
    ctx.body = 'ok'
})

module.exports = router