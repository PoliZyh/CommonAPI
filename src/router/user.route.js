const Router = require('koa-router')

const {
    register,
    login,
    changePassword
} = require('../controller/user.controller')

const {
    userValidator,
    userVerify,
    cryptPassword,
    verifyLogin
} = require('../middleware/user.middleware')

const { auth } = require('../middleware/auth.middleware')

const router = Router({
    prefix: '/users'
})


// 注册接口
router.post('/register', userValidator, userVerify, cryptPassword, register)
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
// 修改密码接口
router.patch('/', auth, cryptPassword, changePassword)

module.exports = router