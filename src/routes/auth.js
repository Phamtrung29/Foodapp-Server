const router = require('express').Router()
const authCtrl = require('../controller/authCtrl')

router.post('/register', authCtrl.createUser)
router.post('/login', authCtrl.loginUser)


module.exports = router