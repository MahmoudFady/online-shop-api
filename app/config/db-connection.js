const mongoose = require("mongoose");
const { MONGO_DB_URL } = process.env;
module.exports = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
      console.log("connected to data base");
      console.log("# ".repeat(15));
    })
    .catch((error) => {
      console.log(error.message);
    });
};
