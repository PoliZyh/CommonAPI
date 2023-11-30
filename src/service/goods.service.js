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

    // 查询商品列表
    async findGoods(pageNum, pageSize) {
        // // 1. 获取总数
        // const count = await Goods.count()
        // // 2. 获取分页的具体数据
        // const offset = (pageNum - 1) * pageSize
        // const limit = pageSize * 1
        // const rows = await Goods.findAll({
        //     offset,
        //     limit
        // })
        const offset = (pageNum - 1) * pageSize
        const limit = pageSize * 1
        const { count, rows } = await Goods.findAndCountAll({ offset, limit })
        return {
            pageNum: offset * 1,
            pageSize: pageSize * 1,
            total: count,
            list: rows
        }
    }
}


module.exports = new GoodsService()