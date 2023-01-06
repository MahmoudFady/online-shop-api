const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  address: {
    country: String,
    state: String,
    city: String,
  },
  password: String,
});
module.exports = mongoose.model("User", userSchema);
