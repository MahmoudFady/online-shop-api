const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split().pop();
    const decode = jwt.verify(token, JWT_KEY);
    next(decode);
  } catch (error) {
    res.status(401).json({
      message: "auth faild",
    });
  }
};
