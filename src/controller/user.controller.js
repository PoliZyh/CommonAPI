const jwt = require('jsonwebtoken')
const {
    createUser, getUserInfo,
} = require('../service/user.service')

const { userRegisterError} = require('../constant/error.type')

const { JWT_SECRET } = require('../config/config.default')

// 控制器
// 1. 获取数据
    // 验证
    // 合法性
    // 合理性
// 2. 操作数据库
// 3. 返回结果

class UserController {
    // 注册
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        try {
            const res = await createUser(user_name, password)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (err) {
            console.error(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    // 登录
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // 登录之后
        // 1. 获取用户信息（在token的payload中，记录id，user_name，is_admin）
        try {
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
                }
            }
        } catch(error) {
            console.error('用户登录失败', error)
        }
    }

    // 修改密码
    async changePassword(ctx, next) {
        ctx.body = '修改成功1'
    }
}


module.exports = new UserController()