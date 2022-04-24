const updateTotalDelivery = {};

updateTotalDelivery.startTotalDeliveryEditing = (
	e,
	setEditTotalDelivery,
	setUpdatedTotalDelivery,
	allOrderIndex,
	orderInfo
) => {
	setEditTotalDelivery(true);
	setUpdatedTotalDelivery(Number(orderInfo.total_delivery_cost));
};

updateTotalDelivery.validateUpdatedTotalDelivery = (
	e,
	setUpdatedTotalDelivery
) => {
	let value = e.target.value;
	setUpdatedTotalDelivery(value);
	e.target.style.boxShadow = "";
};

updateTotalDelivery.updateTotalDelivery = (
	e,
	orderInfo,
	endTotalDeliveryEditing,
	istanbul,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	updatedTotalDelivery
) => {
	const totalDeliveryInputValue = Number(
		e.target.parentElement.previousElementSibling.value
	);
	const totalDeliveryInputElement =
		e.target.parentElement.previousElementSibling;
	if (totalDeliveryInputValue < 0) {
		return (totalDeliveryInputElement.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (totalDeliveryInputElement.value === "") {
		return (totalDeliveryInputElement.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (totalDeliveryInputValue === orderInfo.total_delivery_cost) {
		return endTotalDeliveryEditing();
	}

	totalDeliveryInputElement.style.boxShadow = "";

	istanbul
		.putTotalDeliveryCostInOrder(
			orderInfo.order_id,
			updatedTotalDelivery,
			orderInfo.total_delivery_cost
		)
		.then(() => {
			return istanbul.getSingleOrder(orderInfo.order_id);
		})
		.then((response) => {
			if (orderOutletUpdater) {
				setOrderOutletUpdater(false);
			} else {
				setOrderOutletUpdater(true);
			}
			setOrderDetails(response);
			endTotalDeliveryEditing();
		});
};

updateTotalDelivery.endTotalDeliveryEditing = (
	setEditMode,
	setEditTotalDelivery,
	allOrderIndex
) => {
	setEditMode(false);
	setEditTotalDelivery(false);
};

export { updateTotalDelivery };
