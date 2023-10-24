const User = require("../models/User.js");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json("get all user error");
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(401).json({ message: "user do not exist" });
      }
      const { password, __v, ...userData } = user._doc;
      res.status(201).json(userData);
    } catch (error) {
      res.status(201).json(error);
    }
  },
};
