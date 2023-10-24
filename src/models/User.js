const mongoose = require('mongoose')

const User = mongoose.Schema({
    fullname: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    location: {type: String, default: "Ha noi"}
})

module.exports = mongoose.model('User', User)