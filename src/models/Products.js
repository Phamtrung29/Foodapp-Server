const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    imageUrl: String
})


module.exports = mongoose.model('Product', ProductSchema)