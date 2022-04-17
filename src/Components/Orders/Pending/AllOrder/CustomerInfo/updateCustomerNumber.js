const updateCustomerNumber = {};

updateCustomerNumber.startCustomerIdEditing = (
	e,
	setEditCustomer,
	setUpdatedCustomerId,
	currentCustomerId,
	index
) => {
	setEditCustomer(true);
	e.target.style.display = "none";

	const saveUpdatedCustomerId = document.querySelector(
		`.save-updated-customer-id-${index}`
	);
	saveUpdatedCustomerId.style.display = "inline-block";
	setUpdatedCustomerId(currentCustomerId);
};

updateCustomerNumber.validateUpdatedCustomerId = (
	e,
	setUpdatedCustomerId,
	allCustomers,
	index
) => {
	const value = e.target.value;
	setUpdatedCustomerId(value);
	const editCustomerInput = document.querySelector(
		`.edit-customer-input-${index}`
	);
	for (let i = 0; i < allCustomers.length; i++) {
		if (allCustomers[i].customer_id === value) {
			editCustomerInput.style.outline = "2px solid green";
			break;
		} else {
			editCustomerInput.style.outline = "2px solid red";
		}
	}
};

updateCustomerNumber.updateCustomerId = (
	updatedCustomerId,
	currentCustomerId,
	allCustomers,
	istanbul,
	orderId,
	boxId,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	endCustomerIdEditing,
	index
) => {
	if (updatedCustomerId === currentCustomerId) {
		return endCustomerIdEditing();
	}
	const editCustomerInput = document.querySelector(
		`.edit-customer-input-${index}`
	);
	for (let i = 0; i < allCustomers.length; i++) {
		if (updatedCustomerId === allCustomers[i].customer_id) {
			editCustomerInput.style.outline = "2px solid green";
			istanbul
				.putCustomerInOrder(
					orderId,
					updatedCustomerId,
					currentCustomerId,
					boxId
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
					endCustomerIdEditing();
				});
			break;
		} else {
			editCustomerInput.style.outline = "2px solid red";
		}
	}
};

updateCustomerNumber.endCustomerIdEditing = (
	setEditMode,
	setEditCustomer,
	index
) => {
	const saveUpdatedCustomerId = document.querySelector(
		`.save-updated-customer-id-${index}`
	);
	saveUpdatedCustomerId.style.display = "none";
	setEditMode(false);
	setEditCustomer(false);
};

export { updateCustomerNumber };
