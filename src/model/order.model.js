const { DataTypes } = require('sequelize');

const seq = require('../db/seq')


const Order = seq.define('CommonAPI_Orders', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户的ID'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址ID'
    },
    goods_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品信息'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '总价'
    },
    order_number: {
        type: DataTypes.CHAR(16),
        allowNull: false,
        comment: '订单号'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态 0: 未支付 1: 已经支付 2: 已经发货 3: 已经签收 4: 取消',
    }
})

// Order.sync({ force: true })

module.exports = Order