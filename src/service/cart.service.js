const { Op } = require('sequelize')
const Cart = require('../model/cart.model')

class CartService {
    async createOrUpdate(user_id, goods_id) {
        // 根据user_id和goods_id同时查找有无记录
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id // 同时根据两个字段去查找
                }
            }
        })
        if (res) {
            // 已经存在记录 让number += 1
            await res.increment('number')
            return await res.reload() // 重新加载，因为number字段发生了变化
        } else {
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
}


module.exports = new CartService