const {
    createUser
} = require('../service/user.service')

// 控制器
// 1. 获取数据
// 2. 操作数据库
// 3. 返回结果

class UserController {
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        const res = await createUser(user_name, password)
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name
            }
        }
    }

    async login(ctx, next) {
        ctx.body = 'user login!'
    }
}


module.exports = new UserController()