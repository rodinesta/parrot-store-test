const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const genusRouter = require('./genusRouter')
const productRouter = require('./productRouter')
const roleRouter = require('./roleRouter')

router.use('/user', userRouter)
router.use('/genus', genusRouter)
router.use('/product', productRouter)
router.use('/role', roleRouter)

module.exports = router