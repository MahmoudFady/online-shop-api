require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db-connection");
const userRoutes = require("./api/routes/user");
const productRoutes = require("./api/routes/product");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dbConnection();
app.use("/api/user/", userRoutes);
app.use("/api/products/", productRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "un known api request" });
});
module.exports = app;
