const helperFunctions = {};

helperFunctions.deleteOrder = (
	e,
	deleteOrderConfirmation,
	setDeleteOrderConfirmation,
	istanbul,
	orderInfo,
	orderOutletUpdater,
	setOrderOutletUpdater
) => {
	let orderId = Number(e.target.attributes.orderid.value);
	const countdownElement = e.target.firstElementChild.firstElementChild;

	if (!deleteOrderConfirmation) {
		let seconds = 0;
		countdownElement.style.background =
			"conic-gradient(#10171E 0deg, #F0F1F3 0deg)";
		setDeleteOrderConfirmation(true);

		let orderDeletionInterval = setInterval(() => {
			seconds = seconds + 0.01;
			countdownElement.style.background = `conic-gradient(#10171E ${
				(seconds / 2) * 360
			}deg, #F0F1F3 ${(seconds / 2) * 360}deg)`;
			if (seconds > 2) {
				countdownElement.style.background =
					"conic-gradient(#10171E 0deg, #E7BF72 0deg)";
				setDeleteOrderConfirmation(false);
				clearInterval(orderDeletionInterval);
			}
		});
	} else {
		setDeleteOrderConfirmation(false);
		istanbul.deleteOrder(orderInfo.order_id).then(() => {
			const allCrossButtons = document.querySelectorAll(
				".order-details-cross-icon"
			);
			allCrossButtons.forEach((element) => {
				element.click();
			});

			if (orderOutletUpdater) {
				setOrderOutletUpdater(false);
			} else {
				setOrderOutletUpdater(true);
			}
		});
	}
};

helperFunctions.endAllEditing = (
	allOrderIndex,
	setEditMode,
	setEditBox,
	setEditDeliveredDate,
	setEditPayments,
	paymentsInfo,
	setEditNewPayment
) => {
	const saveUpdatedBoxId = document.querySelector(
		`.save-updated-box-id-${allOrderIndex}`
	);
	saveUpdatedBoxId.style.display = "none";
	const saveUpdatedDeliveredDate = document.querySelector(
		`.save-updated-delivered-date-${allOrderIndex}`
	);
	saveUpdatedDeliveredDate.style.display = "none";
	const saveUpdatedPayments = document.querySelectorAll(
		`.save-updated-payment-${allOrderIndex}`
	);
	saveUpdatedPayments.forEach((element) => {
		element.style.display = "none";
	});
	const saveNewPayment = document.querySelector(
		`.save-new-payment-${allOrderIndex}`
	);
	saveNewPayment.style.display = "none";
	setEditMode(false);
	setEditBox(false);
	setEditDeliveredDate(false);
	setEditPayments((prev) => {
		let newState = { ...prev };
		for (let i = 0; i < paymentsInfo.length; i++) {
			newState[`payment${i + 1}`] = false;
		}
		return newState;
	});
	setEditNewPayment(false);
};

export { helperFunctions };
