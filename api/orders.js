const express = require("express");
const ordersRouter = express.Router();
const Pool = require("pg").Pool;
const connection = {
	user: "postgres",
	password: "154816",
	host: "localhost",
	port: 5432,
	database: "istanbul",
};

// Verifying the orderId parameter was passed successfully and if such an order exists
ordersRouter.param("orderId", (req, res, next, orderId) => {
	if (!orderId) {
		console.log("Nothing was passed in the orderId parameter");
		return res.status(404).send();
	}
	const pool = new Pool(connection);
	pool.connect((err) => {
		if (err) {
			return console.log(err);
		}
		pool.query(
			"SELECT * FROM orders WHERE order_id = $1",
			[orderId],
			(err, data) => {
				if (err) {
					return console.log(err);
				}
				if (!data) {
					return res.status(404).send("No such order found");
				}
				req.order = data.rows;
				pool.end();
				return next();
			}
		);
	});
});

// For getting all orders
ordersRouter.get("/", (req, res, next) => {
	let all = {};
	const pool = new Pool(connection);
	pool.connect((err) => {
		if (err) {
			return console.log(err);
		}
		pool.query("SELECT * FROM orders ORDER BY order_id DESC", (err, data) => {
			if (err) {
				return console.log(err);
			}
			all.total = data.rowCount;
			all.orders = data.rows;
			pool.query(
				"SELECT COUNT(*) FROM orders WHERE pending = $1",
				["true"],
				(err, data) => {
					if (err) {
						return console.log(err);
					}
					all.pending = Number(data.rows[0].count);
					all.completed = all.total - all.pending;
					pool.query("SELECT COUNT(*) FROM boxes", (err, data) => {
						if (err) {
							console.log(err);
						}
						all.boxes = Number(data.rows[0].count);
						res.status(200).send(all);
						pool.end();
					});
				}
			);
		});
	});
});

// For getting detailed information for a single order
ordersRouter.get("/:orderId", (req, res, next) => {
	const orderDetails = {};

	const pool = new Pool(connection);
	pool.connect((err) => {
		if (err) {
			return console.log(err);
		}
		pool.query(
			"SELECT * FROM customers WHERE customer_id = $1",
			[req.order[0].customer_id],
			(err, data) => {
				if (err) {
					return console.log(err);
				}
				orderDetails.customerInfo = data.rows[0];

				pool.query(
					"SELECT * FROM order_payments_" + req.params.orderId,
					(err, data) => {
						if (err) {
							return console.log(err);
						}
						orderDetails.paymentsInfo = data.rows;

						pool.query(
							"SELECT * FROM order_items_" + req.params.orderId,
							(err, data) => {
								if (err) {
									return console.log(err);
								}
								orderDetails.itemsInfo = data.rows;
								res.status(200).send(orderDetails);
								pool.end();
							}
						);
					}
				);
			}
		);
	});
});

ordersRouter.post("/", async (req, res, next) => {
	try {
		const customerId = req.body.customerId;
		const boxId = req.body.boxId;
		const items = req.body.items;
		const payments = req.body.payments;
		const customerFullName = req.body.customerFullName;

		const totalAmount = items
			.map((item) => {
				return Number(item.sellingPrice);
			})
			.reduce((prev, cur) => {
				return prev + cur;
			}, 0);

		let totalPaid = 0;
		if (payments.length > 0) {
			totalPaid = payments
				.map((payment) => {
					return Number(payment.amount);
				})
				.reduce((prev, cur) => {
					return prev + cur;
				}, 0);
		}

		const totalItemCost = items
			.map((item) => {
				return Number(item.buyingPrice);
			})
			.reduce((prev, cur) => {
				return prev + cur;
			}, 0);

		const totalDeliveryCost = 2.5;
		const totalAirwayCost = 0;
		const totalCosts = totalItemCost + totalDeliveryCost + totalAirwayCost;
		const totalProfit = totalAmount - totalCosts;

		let date = new Date(Date.now());
		let createdDate = date.toLocaleDateString("fr-CA");

		const pool = new Pool(connection);

		await pool.connect();

		const returnedNewOrder = await pool.query(
			"INSERT INTO orders (box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
			[
				boxId,
				items.length,
				totalAmount,
				totalAmount - totalPaid,
				customerId,
				customerFullName,
				"true",
				payments.length,
				totalAmount,
				totalCosts,
				totalItemCost,
				totalDeliveryCost,
				totalAirwayCost,
				totalProfit,
				null,
				createdDate,
			]
		);
		const orderId = returnedNewOrder.rows[0].order_id;

		await pool.query(
			"INSERT INTO customer_" +
				customerId +
				" (order_id, box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
			[
				orderId,
				boxId,
				items.length,
				totalAmount,
				totalAmount - totalPaid,
				customerId,
				customerFullName,
				"true",
				payments.length,
				totalAmount,
				totalCosts,
				totalItemCost,
				totalDeliveryCost,
				totalAirwayCost,
				totalProfit,
				null,
				createdDate,
			]
		);

		await pool.query(
			"INSERT INTO box_" +
				boxId +
				" (order_id, box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
			[
				orderId,
				boxId,
				items.length,
				totalAmount,
				totalAmount - totalPaid,
				customerId,
				customerFullName,
				"true",
				payments.length,
				totalAmount,
				totalCosts,
				totalItemCost,
				totalDeliveryCost,
				totalAirwayCost,
				totalProfit,
				null,
				createdDate,
			]
		);

		await pool.query(
			"CREATE TABLE order_items_" +
				orderId +
				" (item_id bigserial NOT NULL, brand text NOT NULL, name text NOT NULL, type text NOT NULL, color text, size text, revenue real NOT NULL, item_costs real NOT NULL, item_cost real NOT NULL, item_delivery_cost real NOT NULL, item_airway_cost real, profit real, PRIMARY KEY (item_id))"
		);

		let deliveryCost = totalDeliveryCost / items.length;

		for (let i = 0; i < items.length; i++) {
			let itemCosts = Number(items[i].buyingPrice) + deliveryCost;
			let profit = Number(items[i].sellingPrice) - itemCosts;
			await pool.query(
				"INSERT INTO order_items_" +
					orderId +
					" (brand, name, type, color, size, revenue, item_costs, item_cost, item_delivery_cost, item_airway_cost, profit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
				[
					items[i].brand,
					items[i].name,
					items[i].type,
					items[i].color,
					items[i].size,
					Number(items[i].sellingPrice),
					itemCosts,
					Number(items[i].buyingPrice),
					deliveryCost,
					0,
					profit,
				]
			);
		}

		await pool.query(
			"CREATE TABLE order_payments_" +
				orderId +
				" (payment_id bigserial NOT NULL, amount real NOT NULL, date date, PRIMARY KEY (payment_id))"
		);

		if (payments.length > 0) {
			for (let i = 0; i < payments.length; i++) {
				await pool.query(
					"INSERT INTO order_payments_" +
						orderId +
						" (amount, date) VALUES ($1, $2)",
					[Number(payments[i].amount), payments[i].date]
				);
			}
		}
		res.status(201).send(orderId);
		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

module.exports = ordersRouter;
