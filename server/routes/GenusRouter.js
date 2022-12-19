const Router = require('express')
const router = new Router()
const genusController = require('../controllers/genusController')

router.post('/', genusController.create)
router.get('/', genusController.getAll)

module.exports = router