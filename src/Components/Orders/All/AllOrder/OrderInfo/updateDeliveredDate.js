const updateDeliveredDate = {};

// Start delivered date editing
updateDeliveredDate.startDeliveredDateEditing = (
	e,
	setEditDeliveredDate,
	dateDelivered,
	setUpdatedDeliveredDate,
	formatDate,
	index
) => {
	setEditDeliveredDate(true);

	let date = new Date(Date.now());
	let todaysDate = date.toLocaleDateString("fr-CA");
	if (dateDelivered) {
		setUpdatedDeliveredDate(formatDate(dateDelivered));
	} else {
		setUpdatedDeliveredDate(todaysDate);
	}
};

// Validate updated delivered date input
updateDeliveredDate.validateUpdatedDeliveredDate = (
	e,
	setUpdatedDeliveredDate
) => {
	const value = e.target.value;
	setUpdatedDeliveredDate(value);
};

// Update delivered date in the data base
updateDeliveredDate.updateDeliveredDate = (
	dateDelivered,
	updatedDeliveredDate,
	endAllEditing,
	istanbul,
	orderId,
	customerId,
	boxId,
	outstanding,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails
) => {
	if (dateDelivered) {
		if (updatedDeliveredDate === dateDelivered) {
			return endAllEditing();
		} else {
			return istanbul
				.putDeliveredDateInOrder(
					orderId,
					customerId,
					boxId,
					updatedDeliveredDate,
					outstanding
				)
				.then(() => {
					return istanbul.getSingleOrder(orderId);
				})
				.then((response) => {
					if (orderOutletUpdater) {
						setOrderOutletUpdater(false);
					} else {
						setOrderOutletUpdater(true);
					}
					setOrderDetails(response);
					endAllEditing();
				});
		}
	} else {
		if (updatedDeliveredDate === "") {
			return endAllEditing();
		} else {
			return istanbul
				.putDeliveredDateInOrder(
					orderId,
					customerId,
					boxId,
					updatedDeliveredDate,
					outstanding
				)
				.then(() => {
					return istanbul.getSingleOrder(orderId);
				})
				.then((response) => {
					if (orderOutletUpdater) {
						setOrderOutletUpdater(false);
					} else {
						setOrderOutletUpdater(true);
					}
					setOrderDetails(response);
					endAllEditing();
				});
		}
	}
};

export { updateDeliveredDate };
