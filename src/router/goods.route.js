const Router = require('koa-router')

const { 
    upload,
    create
} = require('../controller/goods.controller')

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
router.post('/', auth, hasAdminPermission, validator, create)

module.exports = router