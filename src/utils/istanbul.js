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

istanbul.deleteOrder = (orderId) => {
	const url = `${baseUrl}/orders/${orderId}`;

	return fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

istanbul.putCustomerInOrder = (
	orderId,
	updatedCustomerId,
	oldCustomerId,
	boxId
) => {
	const url = `${baseUrl}/orders/${orderId}/customer`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			updatedCustomerId: updatedCustomerId,
			oldCustomerId: oldCustomerId,
			boxId: boxId,
		}),
	});
};

istanbul.putBoxInOrder = (orderId, updatedBoxId, oldBoxId, customerId) => {
	const url = `${baseUrl}/orders/${orderId}/box`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			updatedBoxId: updatedBoxId,
			oldBoxId: oldBoxId,
			customerId: customerId,
		}),
	});
};

istanbul.putDeliveredDateInOrder = (
	orderId,
	customerId,
	boxId,
	updatedDeliveredDate,
	outstanding
) => {
	const url = `${baseUrl}/orders/${orderId}/delivered-date`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			customerId: customerId,
			boxId: boxId,
			updatedDeliveredDate: updatedDeliveredDate,
			outstanding: outstanding,
		}),
	});
};

istanbul.postNewPayment = (orderId, amount) => {
	const url = `${baseUrl}/orders/${orderId}/payment`;

	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			amount: amount,
		}),
	});
};

istanbul.putPaymentsInOrder = (orderId, amount, paymentId) => {
	const url = `${baseUrl}/orders/${orderId}/payments`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			payment: {
				amount: amount,
				paymentId: paymentId,
			},
		}),
	});
};

istanbul.deletePaymentInOrder = (orderId, paymentId) => {
	const url = `${baseUrl}/orders/${orderId}/payment`;

	return fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			paymentId: paymentId,
		}),
	});
};

istanbul.putTotalDeliveryCostInOrder = (
	orderId,
	totalDeliveryCost,
	oldTotalDeliveryCost
) => {
	const url = `${baseUrl}/orders/${orderId}/total-delivery-cost`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			totalDeliveryCost: totalDeliveryCost,
			oldTotalDeliveryCost: oldTotalDeliveryCost,
		}),
	});
};

istanbul.postItemInOrder = () => {};

istanbul.putItemsInOrder = (
	orderId,
	itemId,
	column,
	newInfo,
	oldRevenue,
	oldItemCost,
	oldItemDeliveryCost,
	oldItemAirwayCost
) => {
	const url = `${baseUrl}/orders/${orderId}/items`;

	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			itemId: itemId,
			column: column,
			newInfo: newInfo,
			oldRevenue: oldRevenue,
			oldItemCost: oldItemCost,
			oldItemDeliveryCost: oldItemDeliveryCost,
			oldItemAirwayCost: oldItemAirwayCost,
		}),
	});
};

istanbul.deleteItemInOrder = (orderId, itemId) => {
	const url = `${baseUrl}/orders/${orderId}/items`;

	return fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ itemId: itemId }),
	});
};

export { istanbul };
