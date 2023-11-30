
const {
    createOrUpdate,
    findCarts
} = require('../service/cart.service')

class CartController {

    // 将商品添加到购物车
    // 1. 解析user_id goods_id
    // 2. 操作数据库
    // 3. 返回结果
    async add(ctx) {
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id

        const res = await createOrUpdate(user_id, goods_id)

        ctx.body = {
            code: 0,
            message: '添加到购物车成功',
            result: res
        }
    }

    async findAll(ctx) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findCarts(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取购物车成功',
            result: res
        }
    }


}


module.exports = new CartController()