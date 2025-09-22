const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const connectDB = require("./init/mongodb");
const routes = require("./routes/auth");
const { authRoutes, categoryRoutes } = require("./routes");
const { errorMiddleware } = require("./midddleware");
const { notFound } = require("./controllers");

const app = express();
connectDB();

app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use(notFound);

// error handler
app.use(errorMiddleware);

module.exports = app;
