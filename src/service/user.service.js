const User = require('../model/user.model.js')


// 操作数据库

class UserService {
    // 新增用户
    async createUser(user_name, password) {
        // 插入数据
        const res = await User.create({
            // 表字段: 值
            user_name,
            password
        })
        return res.dataValues
    }

    // 获取用户信息
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'], // 查询哪些字段
            where: whereOpt
        })

        return res ? res.dataValues : null
    }
    
    // 更新
    async updateUserInfoById({id, user_name, password, is_admin}) {
        const whereOpt = {id}
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })

        const res = await User.update(newUser, {
            where: whereOpt
        })

        return res[0] > 0 ? true : false // 大于0成功 否则失败

    }
}



module.exports = new UserService()