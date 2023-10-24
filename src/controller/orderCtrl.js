const Order = require('../models/Order')

module.exports = {
    getUserOrder: async (req, res) => {
        const userId = req.params.id
        try {
            const userOrder = await Order.find({userId})
                .populate({
                    path: 'productId'
                })
                .exec()

            res.status(200).json(userOrder)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createOrder: async (req, res) => {
        const userId = req.params.id
        try {
            const newOrder = new Order({
                ...req.body,
                userId
            })
            await newOrder.save()
            res.status(200).json('create order success')
        } catch (error) {
            res.status(500).json('get all orders error')
        }
    }
}