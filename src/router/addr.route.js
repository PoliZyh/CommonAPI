const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');

const {
    create,
    findAll,
    update,
    remove,
    setDefault
} = require('../controller/addr.controller')

const {
    validator
} = require('../middleware/addr.middleware');

const router = new Router({
    prefix: '/address'
});

// 新增地址
router.post(
    '/', 
    auth, 
    validator({ 
        consignee: 'string',
        phone: {
            type: 'string',
            format: /^1\d{10}$/
        },
        address: 'string'
    }), 
    create
)

// 获取地址列表
router.get('/', auth, findAll)

// 更新地址接口
router.put(
    '/:id', 
    auth, 
    validator({
        consignee: 'string',
        phone: {
            type: 'string',
            format: /^1\d{10}$/
        },
        address: 'string'
    }),
    update
)

// 删除地址
router.delete('/:id', auth, remove)

// 设置默认地址接口
router.patch('/:id', auth, setDefault)

module.exports = router