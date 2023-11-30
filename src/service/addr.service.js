const Addr = require('../model/addr.model')


class AddrService {
    async createAddr(addr) {
        return (await Addr.create(addr)).dataValues
    }

    async findAllAddr(user_id) {
        return await Addr.findAll({
            attributes: ['id', 'user_id', 'consignee', 'phone', 'address', 'is_default'],
            where: {
                user_id
            }
        })
    }

    async updateAddr(id, addr) {
        return await Addr.update(addr, {
            where: {
                id
            }
        })
    }

    async removeAddr(id) {
        return await Addr.destroy({
            where: {
                id
            }
        })
    }

    async setDefaultAddr(id, user_id) {
        // 先将所有的默认地址改为false
        await Addr.update({
            is_default: false
        }, {
            where: {
                user_id
            }
        })
        // 针对id去设置为true
        return await Addr.update({
            is_default: true
        }, {
            where: {
                id
            }
        })
    }
}


module.exports = new AddrService();