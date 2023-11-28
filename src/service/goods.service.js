const Goods = require('../model/goods.model')

class GoodsService {
    // 创建商品
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    // 更新商品
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {
            where: {
                id
            }
        })
        return res[0] > 0 ? true : false
    }

    // 商品下架
    async removeGoods(id) {
        const res = await Goods.destroy({
            where: {
                id
            }
        })
        return res > 0 ? true : false
    }

    // 商品上架
    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id
            }
        })
        return res > 0 ? true : false
    }
}


module.exports = new GoodsService()