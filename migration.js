const Pool = require("pg").Pool;
const connection = {
	user: "postgres",
	password: "154816",
	host: "localhost",
	port: 5432,
	database: "istanbul",
};

const pool = new Pool(connection);

pool.connect((err) => {
	if (err) {
		return console.log(err);
	}
	pool.query(
		"INSERT INTO customer_1 (order_id, box_id, number_of_items, total_amount, outstanding, customer_id, customer_full_name, pending, number_of_payments, total_revenue, total_costs, total_item_cost, total_delivery_cost, total_airway_cost, total_profit, date_delivered, date_created) VALUES (1, 6, 1, 700, 500, 1, 'suchka', true, 1, 700, 500, 0, 0, 0, 200, '2022-03-01', '2022-03-01')",
		(err, data) => {
			if (err) {
				return console.log(err);
			}
			pool.end();
		}
	);
});
