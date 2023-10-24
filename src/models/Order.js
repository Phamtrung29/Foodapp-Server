const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: { type: String, require: true },
    qty: { type: Number, require: true },
    address: {
        type: String,
        require: true
    },
    delivery_status: { type: String, default: "pending" },
    total: { type: Number, require: true },
    payment_status: { type: String, require: true },
    phone: { type: Number, require: true }
})




module.exports = mongoose.model('Order', Order)