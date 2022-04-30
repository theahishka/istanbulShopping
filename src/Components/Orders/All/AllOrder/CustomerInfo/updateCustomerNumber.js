import { generalUX } from "../../../../utils/generalUX";

const updateCustomerNumber = {};

updateCustomerNumber.startCustomerIdEditing = (
	e,
	setEditCustomer,
	setUpdatedCustomerId,
	currentCustomerId,
	index
) => {
	setEditCustomer(true);
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
			editCustomerInput.style.boxShadow = "0px 0px 0px 2px green";
			break;
		} else {
			editCustomerInput.style.boxShadow = "0px 0px 0px 2px red";
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
			editCustomerInput.style.boxShadow = "0px 0px 0px 2px green";
			generalUX.showLoader();
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
					generalUX.hideLoader();
				});
			break;
		} else {
			editCustomerInput.style.boxShadow = "0px 0px 0px 2px red";
		}
	}
};

updateCustomerNumber.endCustomerIdEditing = (
	setEditMode,
	setEditCustomer,
	index
) => {
	setEditMode(false);
	setEditCustomer(false);
};

export { updateCustomerNumber };
