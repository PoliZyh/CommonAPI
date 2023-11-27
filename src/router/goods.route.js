const Router = require('koa-router')

const { 
    upload
} = require('../controller/goods.comtroller')

const { 
    auth,
    hasAdminPermission 
} = require('../middleware/auth.middleware')



const router = new Router({
    prefix: '/goods'
})



router.post('/upload', auth, hasAdminPermission, upload)


module.exports = router