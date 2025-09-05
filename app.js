const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require('morgan')

dotenv.config();
const connectDB = require("./init/mongodb");
const routes = require('./routes/auth');
const { authRoutes } = require("./routes");


const app = express();
connectDB();

app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan('dev'))


// routes

app.use("/api/v1/auth", authRoutes )

module.exports = app;
