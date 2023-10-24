const User = require('../models/User')

const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            fullname: req.body.fullname,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        })
        try {
            await newUser.save()
            res.status(201).json({ message: "User successfully created" })
        } catch (error) {
            res.status(500).json({ message: error })

        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                res.status(401).json("Wrong credentials provide a valid email")
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)

            const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8)

            if (decryptedPass !== req.body.password) {
                res.status(401).json("Wrong password")
            }
            const userToken = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_SECRET, { expiresIn: "7d" }
            )

            const { password, __v, ...userData } = user._doc
            res.status(200).json({ ...userData, token: userToken })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}