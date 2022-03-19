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
		pool.query(
			"SELECT * FROM orders ORDER BY order_id DESC",
			(err, data) => {
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
						pool.query(
							"SELECT COUNT(*) FROM boxes",
							(err, data) => {
								if (err) {
									console.log(err);
								}
								all.boxes = Number(data.rows[0].count);
								res.status(200).send(all);
								pool.end();
							}
						);
					}
				);
			}
		);
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
					"SELECT * FROM order_payments_" +
						req.params.orderId +
						" ORDER BY payment_id ASC",
					(err, data) => {
						if (err) {
							return console.log(err);
						}
						orderDetails.paymentsInfo = data.rows;

						pool.query(
							"SELECT * FROM order_items_" +
								req.params.orderId +
								" ORDER BY item_id ASC",
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

// Posting new order
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

		let createdDate = new Date(Date.now());

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
				" (payment_id bigserial NOT NULL, amount real NOT NULL, date timestamp with time zone, PRIMARY KEY (payment_id))"
		);

		let date = new Date(Date.now());
		let time = date.toTimeString();

		if (payments.length > 0) {
			for (let i = 0; i < payments.length; i++) {
				await pool.query(
					"INSERT INTO order_payments_" +
						orderId +
						" (amount, date) VALUES ($1, $2)",
					[
						Number(payments[i].amount),
						new Date(`${payments[i].date} ${time}`),
					]
				);
			}
		}
		res.status(201).send(orderId);
		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Put customer in order
ordersRouter.put("/:orderId/customer", async (req, res, next) => {
	try {
		const orderId = Number(req.order[0].order_id);
		const updatedCustomerId = Number(req.body.updatedCustomerId);
		const oldCustomerId = Number(req.body.oldCustomerId);
		const boxId = Number(req.body.boxId);

		const pool = new Pool(connection);
		await pool.connect();
		const updatedCustomer = await pool.query(
			"SELECT * FROM customers WHERE customer_id = $1",
			[updatedCustomerId]
		);
		const updatedCustomerFullName = updatedCustomer.rows[0].full_name;

		const updatedOrderArray = await pool.query(
			"UPDATE orders SET customer_id = $1, customer_full_name = $2 WHERE order_id = $3 RETURNING *",
			[updatedCustomerId, updatedCustomerFullName, orderId]
		);

		const updatedOrder = updatedOrderArray.rows[0];

		await pool.query(
			"UPDATE box_" +
				boxId +
				" SET customer_id = $1, customer_full_name = $2 WHERE order_id = $3",
			[updatedCustomerId, updatedCustomerFullName, orderId]
		);

		await pool.query(
			"DELETE FROM customer_" + oldCustomerId + " WHERE order_id = $1",
			[orderId]
		);

		await pool.query(
			"INSERT INTO customer_" +
				updatedCustomerId +
				" (order_id, box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
			[
				updatedOrder.order_id,
				updatedOrder.box_id,
				updatedOrder.number_of_items,
				updatedOrder.total_amount,
				updatedOrder.outstanding,
				updatedOrder.customer_id,
				updatedOrder.customer_full_name,
				updatedOrder.pending,
				updatedOrder.number_of_payments,
				updatedOrder.total_revenue,
				updatedOrder.total_costs,
				updatedOrder.total_item_cost,
				updatedOrder.total_delivery_cost,
				updatedOrder.total_airway_cost,
				updatedOrder.total_profit,
				updatedOrder.date_delivered,
				updatedOrder.date_created,
			]
		);

		res.status(200).send(
			"Order has been reallocated to another customer successfully"
		);

		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Put box in order
ordersRouter.put("/:orderId/box", async (req, res, next) => {
	try {
		const orderId = Number(req.order[0].order_id);
		const updatedBoxId = Number(req.body.updatedBoxId);
		const oldBoxId = Number(req.body.oldBoxId);
		const customerId = Number(req.body.customerId);

		const pool = new Pool(connection);
		await pool.connect();

		const updatedOrderArray = await pool.query(
			"UPDATE orders SET box_id = $1 WHERE order_id = $2 RETURNING *",
			[updatedBoxId, orderId]
		);
		const updatedOrder = updatedOrderArray.rows[0];

		await pool.query(
			"UPDATE customer_" +
				customerId +
				" SET box_id = $1 WHERE order_id = $2",
			[updatedBoxId, orderId]
		);

		await pool.query(
			"DELETE FROM box_" + oldBoxId + " WHERE order_id = $1",
			[orderId]
		);

		await pool.query(
			"INSERT INTO box_" +
				updatedBoxId +
				" (order_id, box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
			[
				updatedOrder.order_id,
				updatedOrder.box_id,
				updatedOrder.number_of_items,
				updatedOrder.total_amount,
				updatedOrder.outstanding,
				updatedOrder.customer_id,
				updatedOrder.customer_full_name,
				updatedOrder.pending,
				updatedOrder.number_of_payments,
				updatedOrder.total_revenue,
				updatedOrder.total_costs,
				updatedOrder.total_item_cost,
				updatedOrder.total_delivery_cost,
				updatedOrder.total_airway_cost,
				updatedOrder.total_profit,
				updatedOrder.date_delivered,
				updatedOrder.date_created,
			]
		);

		res.status(200).send(
			"Order has been reallocated to another box successfully"
		);

		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Put delivery date in order
ordersRouter.put("/:orderId/delivered-date", async (req, res, next) => {
	try {
		const orderId = Number(req.order[0].order_id);
		const customerId = req.body.customerId;
		const boxId = req.body.boxId;
		let updatedDeliveredDate = req.body.updatedDeliveredDate;
		let date = new Date(Date.now());
		let time = date.toTimeString();

		const outstanding = Number(req.body.outstanding);
		let pending = true;

		if (outstanding === 0 && updatedDeliveredDate) {
			pending = false;
		}

		if (!updatedDeliveredDate) {
			updatedDeliveredDate = null;
		}

		if (updatedDeliveredDate) {
			updatedDeliveredDate = new Date(`${updatedDeliveredDate} ${time}`);
		}

		const pool = new Pool(connection);
		await pool.connect();

		await pool.query(
			"UPDATE orders SET date_delivered = $1, pending = $2 WHERE order_id = $3",
			[updatedDeliveredDate, pending, orderId]
		);

		await pool.query(
			"UPDATE customer_" +
				customerId +
				" SET date_delivered = $1, pending = $2 WHERE order_id = $3",
			[updatedDeliveredDate, pending, orderId]
		);

		await pool.query(
			"UPDATE box_" +
				boxId +
				" SET date_delivered = $1, pending = $2 WHERE order_id = $3",
			[updatedDeliveredDate, pending, orderId]
		);

		res.status(200).send("Delivery date has been updated successfully");

		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Post new payment
ordersRouter.post("/:orderId/payment", async (req, res, next) => {
	try {
		const orderId = Number(req.params.orderId);
		const customerId = req.order[0].customer_id;
		const boxId = req.order[0].box_id;
		const dateDelivered = req.order[0].date_delivered;
		const amount = Number(req.body.amount);
		const revenue = req.order[0].total_amount;
		let date = new Date(Date.now());

		console.log(amount);
		const pool = new Pool(connection);
		await pool.connect();

		await pool.query(
			"INSERT INTO order_payments_" +
				orderId +
				" (amount, date) VALUES ($1, $2)",
			[amount, date]
		);

		const payments = await pool.query(
			"SELECT * FROM order_payments_" +
				orderId +
				" ORDER BY payment_id ASC"
		);

		const totalPayments = payments.rows
			.map((payment) => {
				return Number(payment.amount);
			})
			.reduce((prev, cur) => {
				return prev + cur;
			}, 0);

		const outstanding = revenue - totalPayments;

		let pending = true;
		if (outstanding === 0 && dateDelivered) {
			pending = false;
		}

		await pool.query(
			"UPDATE orders SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE customer_" +
				customerId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE box_" +
				boxId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		res.status(201).send();

		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Put payments in order
ordersRouter.put("/:orderId/payments", async (req, res, next) => {
	try {
		const orderId = Number(req.params.orderId);
		const customerId = req.order[0].customer_id;
		const boxId = req.order[0].box_id;
		const dateDelivered = req.order[0].date_delivered;
		const newAmount = Number(req.body.payment.amount);
		const paymentId = Number(req.body.payment.paymentId);
		const revenue = req.order[0].total_amount;
		let date = new Date(Date.now());

		const pool = new Pool(connection);
		await pool.connect();

		await pool.query(
			"UPDATE order_payments_" +
				orderId +
				" SET amount = $1 WHERE payment_id = $2",
			[newAmount, paymentId]
		);

		const payments = await pool.query(
			"SELECT * FROM order_payments_" +
				orderId +
				" ORDER BY payment_id ASC"
		);

		const totalPayments = payments.rows
			.map((payment) => {
				return Number(payment.amount);
			})
			.reduce((prev, cur) => {
				return prev + cur;
			}, 0);

		const outstanding = revenue - totalPayments;
		let pending = true;
		if (outstanding === 0 && dateDelivered) {
			pending = false;
		}

		await pool.query(
			"UPDATE orders SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE customer_" +
				customerId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE box_" +
				boxId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		res.status(200).send();
		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Delete payment in order
ordersRouter.delete("/:orderId/payment", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const customerId = req.order[0].customer_id;
		const boxId = req.order[0].box_id;
		const dateDelivered = req.order[0].date_delivered;
		const paymentId = Number(req.body.paymentId);
		const revenue = req.order[0].total_amount;
		const oldOutstanding = req.order[0].outstanding;
		let date = new Date(Date.now());

		const pool = new Pool(connection);
		await pool.connect();

		const deletingAmount = await pool.query(
			"SELECT amount FROM order_payments_" +
				orderId +
				" WHERE payment_id = $1",
			[paymentId]
		);

		const outstanding = oldOutstanding + deletingAmount.rows[0].amount;

		let pending = true;
		if (outstanding === 0 && dateDelivered) {
			pending = false;
		}

		await pool.query(
			"DELETE FROM order_payments_" + orderId + " WHERE payment_id = $1",
			[paymentId]
		);

		await pool.query(
			"UPDATE orders SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE customer_" +
				customerId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		await pool.query(
			"UPDATE box_" +
				boxId +
				" SET outstanding = $1, pending = $2 WHERE order_id = $3",
			[outstanding, pending, orderId]
		);

		res.status(204).send();
		await pool.end();
	} catch (err) {
		console.log(err);
	}
});

// Put total delivery cost in order
ordersRouter.put("/:orderId/total-delivery-cost", (req, res, next) => {});

module.exports = ordersRouter;
