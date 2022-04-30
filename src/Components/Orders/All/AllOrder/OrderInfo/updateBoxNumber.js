import { generalUX } from "../../../../utils/generalUX";

const updateBoxNumber = {};

// Start box Id editing
updateBoxNumber.startBoxIdEditing = (
	e,
	setEditBox,
	setUpdatedBoxId,
	currentBoxId,
	index
) => {
	setEditBox(true);

	setUpdatedBoxId(currentBoxId);
};

// Validate updated box Id input
updateBoxNumber.validateUpdatedBoxId = (
	e,
	setUpdatedBoxId,
	allBoxes,
	index
) => {
	const value = e.target.value;
	setUpdatedBoxId(value);
	const editBoxInput = document.querySelector(`.edit-box-input-${index}`);
	for (let i = 0; i < allBoxes.length; i++) {
		if (allBoxes[i].box_id === value) {
			editBoxInput.style.boxShadow = "0px 0px 0px 2px green";
			break;
		} else {
			editBoxInput.style.boxShadow = "0px 0px 0px 2px red";
		}
	}
};

// Update box Id in the data base
updateBoxNumber.updateBoxId = (
	updatedBoxId,
	currentBoxId,
	allBoxes,
	istanbul,
	orderId,
	customerId,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	endAllEditing,
	index
) => {
	if (Number(updatedBoxId) === currentBoxId) {
		return endAllEditing();
	}
	const editBoxInput = document.querySelector(`.edit-box-input-${index}`);
	for (let i = 0; i < allBoxes.length; i++) {
		if (updatedBoxId === allBoxes[i].box_id) {
			editBoxInput.style.boxShadow = "0px 0px 0px 2px green";
			generalUX.showLoader();

			istanbul
				.putBoxInOrder(orderId, updatedBoxId, currentBoxId, customerId)
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
					generalUX.hideLoader();
				});
			break;
		} else {
			editBoxInput.style.boxShadow = "0px 0px 0px 2px red";
		}
	}
};

export { updateBoxNumber };
