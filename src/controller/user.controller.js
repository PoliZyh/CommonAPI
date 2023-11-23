// 控制器
class UserController {
    async register(ctx, next) {
        ctx.body = 'user login!'
    }

    async login(ctx, next) {
        ctx.body = 'user login!'
    }
}


module.exports = new UserController()