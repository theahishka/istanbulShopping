const express = require("express");
const apiRouter = express.Router();
const ordersRouter = require("./orders");

apiRouter("/orders", ordersRouter);

module.exports = apiRouter;
