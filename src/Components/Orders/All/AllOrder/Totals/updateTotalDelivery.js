const updateTotalDelivery = {};

updateTotalDelivery.startTotalDeliveryEditing = (
	e,
	setEditTotalDelivery,
	setUpdatedTotalDelivery,
	allOrderIndex,
	orderInfo
) => {
	setEditTotalDelivery(true);
	e.target.style.display = "none";

	const saveUpdatedTotalDelivery = document.querySelector(
		`.save-updated-total-delivery-${allOrderIndex}`
	);
	saveUpdatedTotalDelivery.style.display = "inline-block";
	setUpdatedTotalDelivery(Number(orderInfo.total_delivery_cost));
};

updateTotalDelivery.validateUpdatedTotalDelivery = (
	e,
	setUpdatedTotalDelivery
) => {
	let value = e.target.value;
	setUpdatedTotalDelivery(value);
	e.target.style.outline = "";
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
		e.target.previousElementSibling.previousElementSibling.value
	);
	const totalDeliveryInputElement =
		e.target.previousElementSibling.previousElementSibling;
	if (totalDeliveryInputValue < 0) {
		return (totalDeliveryInputElement.style.outline = "2px solid red");
	}

	if (totalDeliveryInputElement.value === "") {
		return (totalDeliveryInputElement.style.outline = "2px solid red");
	}

	if (totalDeliveryInputValue === orderInfo.total_delivery_cost) {
		return endTotalDeliveryEditing();
	}

	totalDeliveryInputElement.style.outline = "";

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
	const saveUpdatedTotalDelivery = document.querySelector(
		`.save-updated-total-delivery-${allOrderIndex}`
	);
	saveUpdatedTotalDelivery.style.display = "none";
};

export { updateTotalDelivery };
