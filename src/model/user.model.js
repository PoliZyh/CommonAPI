const seq = require('../db/seq')
const {
    DataTypes,
} = require('sequelize')

// 创建模型（Model CommonAPI_User -> CommonAPI_Users）
const User = seq.define('CommonAPI_User', {
    // id会被seq自动创建
    user_name: {
        type: DataTypes.STRING, // varchar(255)
        allowNull: false, // 是否允许为空
        unique: true, // 是否唯一
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64), // char(64)
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN, // tinyint(1)
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员， 0:不是管理员(默认) 1:是管理员'
    }
})

// 同步到数据库, 仅仅在第一次使用
// User.sync({
//     force: true, // 若有表，先删除再创建
// })

module.exports = User