const istanbul = {};
const baseUrl = "http://localhost:4000/api";

istanbul.getOrders = () => {
	const url = `${baseUrl}/orders`;

	return fetch(url).then((response) => {
		return response.json();
	});
};

export { istanbul };
