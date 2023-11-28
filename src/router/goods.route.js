const Router = require('koa-router')

const { 
    upload,
    create,
    update,
    remove,
    restore,
    findAll
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

// 修改商品信息接口
router.put('/:id', auth, hasAdminPermission, validator, update)

// 硬删除商品接口
// router.delete('/:id', auth, hasAdminPermission, remove)

// 商品上下架
router.post('/:id/off', auth, hasAdminPermission, remove)

// 商品上架
router.post('/:id/on', auth, hasAdminPermission, restore)

// 获取商品列表
router.get('/', findAll)

module.exports = router