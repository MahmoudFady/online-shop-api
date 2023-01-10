const User = require("../models/user");
const generateToken = require("../helper/generate-token");
const bcrypt = require("bcryptjs");
module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email does't exist" });
    }
    const matchedPassword =  bcrypt.compareSync(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "wrong password" });
    }
    const token = generateToken({ userId: user._id, email });
    res.status(200).json({
      message: "signin success",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(406).json({ message: "email already exist" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hash,
    }).save();
    const token = generateToken({ userId: user._id, email });
    res.json({ message: "signup success", user, token });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
