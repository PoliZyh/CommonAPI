const {
    createUser,
} = require('../service/user.service')

const { userRegisterError} = require('../constant/error.type')

// 控制器
// 1. 获取数据
    // 验证
    // 合法性
    // 合理性
// 2. 操作数据库
// 3. 返回结果

class UserController {
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

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        ctx.body = `欢迎回来，${user_name}`
    }
}


module.exports = new UserController()