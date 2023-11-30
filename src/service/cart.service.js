const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

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

    async findCarts(pageNum, pageSize) {
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected', 'goods_id'], //要查找的字段
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_price', 'goods_img', 'goods_name']
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async updateCarts(params) {
        const { id, number, selected } = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined && (res.number = number)
        selected !== undefined && (res.selected = selected)
        return await res.save()
    }
}


module.exports = new CartService