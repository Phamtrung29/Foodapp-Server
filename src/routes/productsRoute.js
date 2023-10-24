const router = require('express').Router()
const productCtrl = require('../controller/productCtrl')

router.get('/search/:key', productCtrl.searchProduct)
router.get('/', productCtrl.getAllProduct)
router.post('/', productCtrl.createProduct)
module.exports = router