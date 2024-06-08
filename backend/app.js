const express = require("express");
const errorMiddleware = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
//Route Imports
const productRoute = require("./routes/productRoute.js");
const userRoute = require("./routes/userRoutes.js");
const orderRoute = require("./routes/orderRoute.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;