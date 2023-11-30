const Router = require('koa-router');

// 中间件
const {
    auth
} = require('../middleware/auth.middleware')
const {
    validator
} = require('../middleware/cart.middleware')

// 控制器
const {
    add,
    findAll,
    update,
    remove
} = require('../controller/cart.controller');
const router = new Router({
    prefix: '/carts'
})

// 添加到购物车 登录/格式
router.post('/', auth, validator({ goods_id: 'number' }), add)

// 获取购物车列表
router.get('/', auth, findAll)

// 更新购物车接口
router.patch(
    '/:id',
    auth,
    validator({
        number: { type: 'number', required: false },
        selected: { type: 'boolean', required: false }
    }),
    update
)

// 删除购物车
router.delete(
    '/',
    auth,
    validator({
        ids: 'array'
    }),
    remove
)

module.exports = router