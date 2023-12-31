const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Goods = require('./goods.model')

const Cart = seq.define('CommonAPI_Carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品数量',
        defaultValue: 1
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '是否选中',
        defaultValue: true
    }
})

// 与Goods关联 
Cart.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'goods_info'
})
// Cart.sync({ force: true })

module.exports = Cart