const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { userAlreadyExited, userFormateError, userRegisterError } = require('../constant/error.type')

// 用户格式验证器
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    // 验证合法性
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx) // 提交错误
        return
    }
    // 交给下一个中间件处理
    await next()
}

// 用户合法性
const userVerify = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    // 验证合理性
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已经存在', { user_name })
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

// 加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        // hash保存的是密文
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        ctx.request.body.password = hash;
        await next();
    } catch (error) {
        console.error(error);
        ctx.app.emit('error', userRegisterError, ctx);
        return
    }
}


module.exports = {
    userValidator,
    userVerify,
    cryptPassword
}