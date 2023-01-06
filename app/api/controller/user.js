const User = require("../models/user");
module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: "email does't exist" });
    }
    if (existedUser.password !== password) {
      return res.status(401).json({ message: "wrong password exist" });
    }
    res.status(200).json({
      message: "signin success",
      user: existedUser,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "some thing go wrong",
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
    const user = await new User({
      name,
      email,
      phone,
      address,
      password,
    }).save();
    res.json({ message: "signup success", user });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
