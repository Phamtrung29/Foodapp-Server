const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    userId: { type: String, require: true },
    products: [
        {
            cartItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            qty: {
                type: Number,
                default: 1
            }
        }
    ]
})


module.exports = mongoose.model('Cart', CartSchema)