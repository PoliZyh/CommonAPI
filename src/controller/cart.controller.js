
const {
    createOrUpdate,
    findCarts,
    updateCarts,
    removeCarts,
    selectAllCarts,
    unSelectAllCarts
} = require('../service/cart.service')

const {
    cartFormatError
} = require('../constant/error.type')

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

    async update(ctx) {
        const id = ctx.request.params.id
        const { number, selected } = ctx.request.body
        if (number === undefined && selected === undefined) {
            cartFormatError.message = 'number和selected不能同时为空'
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        const res = await updateCarts({ id, number, selected })
        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }
    }

    async remove(ctx) {
        const ids = ctx.request.body.ids
        const res = await removeCarts(ids)
        ctx.body = {
            code: 0,
            message: '删除购物车成功',
            result: res
        }
    }

    async selectAll(ctx) {
        const { id } = ctx.state.user
        const res = await selectAllCarts(id)
        ctx.body = {
            code: 0,
            message: '全部选中',
            result: res
        }
    }

    async unSelectAll(ctx) {
        const { id } = ctx.state.user
        const res = await unSelectAllCarts(id)
        ctx.body = {
            code: 0,
            message: '全部取消选中',
            result: res
        }
    }

}


module.exports = new CartController()