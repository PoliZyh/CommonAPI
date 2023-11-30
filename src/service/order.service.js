
const Order = require('../model/order.model')

class OrderService {
    async createOrder(order) {
        return await Order.create(order)
    }

    async findAllOrder(pageSize, pageNum, status) {
        const offset = (pageNum - 1) * pageSize
        const limit = pageSize * 1
        const { count, rows } = await Order.findAndCountAll({
            where: {
                status
            },
            offset,
            limit
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async updateOrderStatus(id, status) {
        return await Order.update({
            status
        }, {
            where: {
                id
            }
        })
    }

}


module.exports = new OrderService();