const Pool = require("pg").Pool;
const connection = {
	user: "postgres",
	password: "154816",
	host: "localhost",
	port: 5432,
	database: "istanbul",
};

(async () => {
	const pool = new Pool(connection);
	await pool.connect();
	const customerDate = await pool.query(
		"SELECT date_joined FROM customers WHERE customer_id = $1",
		[59]
	);
	console.log(customerDate.rows);
	await pool.end();
})();
