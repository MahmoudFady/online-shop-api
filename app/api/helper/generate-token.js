const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
module.exports = (data) => {
  const token = jwt.sign(data, JWT_KEY, {
    expiresIn: "1d",
  });
  console.log(token);
  return token;
};
