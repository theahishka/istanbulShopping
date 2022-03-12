const istanbul = {};
const baseUrl = "http://localhost:4000/api";

istanbul.getAllOrders = () => {
	const url = `${baseUrl}/orders`;

	return fetch(url).then((response) => {
		return response.json();
	});
};

istanbul.getSingleOrder = (orderId) => {
	const url = `${baseUrl}/orders/${orderId}`;

	return fetch(url).then((response) => {
		return response.json();
	});
};

istanbul.getAllCustomers = () => {
	const url = `${baseUrl}/customers`;

	return fetch(url).then((response) => {
		return response.json();
	});
};

istanbul.getAllBoxes = () => {
	const url = `${baseUrl}/boxes`;

	return fetch(url).then((response) => {
		return response.json();
	});
};

istanbul.postNewCustomer = (newCustomer) => {
	const url = `${baseUrl}/customers`;

	let customer = {
		fullName: newCustomer.fullName,
		address: newCustomer.address,
		phone: newCustomer.phone,
		comments: newCustomer.comments,
	};
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(customer),
	}).then((response) => {
		return response.json();
	});
};

istanbul.postNewBox = () => {
	const url = `${baseUrl}/boxes`;

	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		return response.json();
	});
};

istanbul.postNewOrder = (newOrder) => {
	const url = `${baseUrl}/orders`;

	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newOrder),
	}).then((response) => {
		return response.json();
	});
};

export { istanbul };
