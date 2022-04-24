const updatePayments = {};

// Start payment editing
updatePayments.startPaymentEditing = (
	e,
	setEditPayments,
	setUpdatedPayments,
	paymentsInfo
) => {
	let index = Number(e.target.attributes.index.value);
	setEditPayments((prev) => {
		let newState = { ...prev };
		newState[`payment${index + 1}`] = true;
		return newState;
	});

	setUpdatedPayments((prev) => {
		let stateObject = { ...prev };
		stateObject[`payment${index + 1}`].amount = paymentsInfo[index].amount;
		return stateObject;
	});
};

// Validate updated payment input and update state
updatePayments.validateUpdatedPayments = (e, setUpdatedPayments) => {
	let value = e.target.value;
	let index = Number(e.target.attributes.index.value);
	setUpdatedPayments((prev) => {
		let stateObject = { ...prev };
		stateObject[`payment${index + 1}`].amount = value;
		return stateObject;
	});
	e.target.style.boxShadow = "";
};

// Update payment info in the data base
updatePayments.updatePayments = (
	e,
	updatedPayments,
	paymentsInfo,
	endAllEditing,
	istanbul,
	orderInfo,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails
) => {
	let inputBox = e.target.parentElement.previousElementSibling;
	let index = Number(e.target.attributes.index.value);

	if (Number(updatedPayments[`payment${index + 1}`].amount) < 0) {
		return (inputBox.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (
		Number(updatedPayments[`payment${index + 1}`].amount) ===
		paymentsInfo[index].amount
	) {
		return endAllEditing();
	}

	if (updatedPayments[`payment${index + 1}`].amount === "") {
		return (inputBox.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (Number(updatedPayments[`payment${index + 1}`].amount) === 0) {
		return istanbul
			.deletePaymentInOrder(
				orderInfo.order_id,
				updatedPayments[`payment${index + 1}`].paymentId
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
				endAllEditing();
			});
	}

	inputBox.style.outline = "";

	istanbul
		.putPaymentsInOrder(
			orderInfo.order_id,
			updatedPayments[`payment${index + 1}`].amount,
			updatedPayments[`payment${index + 1}`].paymentId
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
			endAllEditing();
		});
};

// Start new payment editing
updatePayments.startNewPaymentEditing = (
	e,
	setEditNewPayment,
	allOrderIndex,
	setUpdatedNewPayment
) => {
	setEditNewPayment(true);
	setUpdatedNewPayment(0);

};

// Validate updated new payment input
updatePayments.validateUpdatedNewPayment = (e, setUpdatedNewPayment) => {
	let value = e.target.value;
	setUpdatedNewPayment(value);
	e.target.style.boxShadow = "";
};

// Create new payment in the data base
updatePayments.createNewPayment = (
	e,
	updatedNewPayment,
	istanbul,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	orderInfoUpdater,
	setOrderInfoUpdater,
	endAllEditing,
	orderInfo
) => {
	const newPaymentInput = e.target.parentElement.previousElementSibling;

	if (updatedNewPayment === "") {
		return (newPaymentInput.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (Number(updatedNewPayment) < 0) {
		return (newPaymentInput.style.boxShadow = "0px 0px 0px 2px red");
	}

	if (Number(updatedNewPayment) === 0) {
		return (newPaymentInput.style.boxShadow = "0px 0px 0px 2px red");
	}

	newPaymentInput.style.outline = "";

	istanbul
		.postNewPayment(orderInfo.order_id, updatedNewPayment)
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

			if (orderInfoUpdater) {
				setOrderInfoUpdater(false);
			} else {
				setOrderInfoUpdater(true);
			}

			endAllEditing();
		});
};

export { updatePayments };
