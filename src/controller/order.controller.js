
const {
    createOrder,
    findAllOrder,
    updateOrderStatus
} = require('../service/order.service')

class OrderController {
    async create(ctx) {
        const user_id = ctx.state.user.id;
        const { address_id, goods_info, total } = ctx.request.body;
        const order_number = 'CNA' + Date.now();
        const res = await createOrder({user_id, address_id, goods_info, total, order_number})

        ctx.body = {
            code: 0,
            message: '创建订单成功',
            result: res
        }
    }

    async findAll(ctx) {
        const { pageSize = 1, pageNum = 10, status = 0 } = ctx.request.query
        const res = await findAllOrder(pageSize, pageNum, status)
        ctx.body = {
            code: 0,
            message: '查询成功',
            result: res
        }
    }

    async update(ctx) {
        const id = ctx.request.params.id
        const status = ctx.request.body.status
        const res = await updateOrderStatus(id, status)
        ctx.body = {
            code: 0,
            message: '更新订单状态成功',
            result: res
        }
    }
}


module.exports = new OrderController()