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
}



module.exports = new UserService()