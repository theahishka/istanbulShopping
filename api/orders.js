const express = require("express");
const ordersRouter = express.Router();
const Client = require("pg").Client;
const client = new Client({
	user: "postgres",
	password: "154816",
	host: "localhost",
	port: 5432,
	database: "istanbul",
});

ordersRouter.get("/", (req, res, next) => {
	client
		.connect()
		.then(() => console.log("connected to database successfully"))
		.then(() => client.query("SELECT * FROM istanbul.orders"))
		.then((results) => console.log(results))
		.catch((e) => console.log(e))
		.finally(() => client.end());
});

module.exports = ordersRouter;
