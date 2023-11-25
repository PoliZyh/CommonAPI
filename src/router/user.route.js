const Router = require('koa-router')

const {
    register,
    login
} = require('../controller/user.controller')

const {
    userValidator,
    userVerify
} = require('../middleware/user.middleware')


const router = Router({
    prefix: '/users'
})


// 注册接口
router.post('/register',userValidator, userVerify, register)
// 登录接口
router.post('/login', login)


module.exports = router