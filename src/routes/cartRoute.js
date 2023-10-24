const router = require('express').Router()
const cartCtrl = require('../controller/cartCtrl')

router.post('/qty', cartCtrl.decrementCartItem)
router.post('/', cartCtrl.addToCart)
router.get('/find/:id', cartCtrl.getCart)
router.delete('/:cartItemId', cartCtrl.deleteCartItem)


module.exports = router