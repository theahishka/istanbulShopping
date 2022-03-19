const updateBoxNumber = {};

updateBoxNumber.startBoxIdEditing = (
	e,
	setEditBox,
	setUpdatedBoxId,
	currentBoxId,
	index
) => {
	setEditBox(true);
	e.target.style.display = "none";

	const saveUpdatedBoxId = document.querySelector(
		`.save-updated-box-id-${index}`
	);
	saveUpdatedBoxId.style.display = "inline-block";
	setUpdatedBoxId(currentBoxId);
};

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
			editBoxInput.style.outline = "2px solid green";
			break;
		} else {
			editBoxInput.style.outline = "2px solid red";
		}
	}
};

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
			editBoxInput.style.outline = "2px solid green";
			istanbul
				.putBoxInOrder(orderId, updatedBoxId, currentBoxId, customerId)
				.then(() => {
					istanbul.getSingleOrder(orderId).then((response) => {
						if (orderOutletUpdater) {
							setOrderOutletUpdater(false);
						} else {
							setOrderOutletUpdater(true);
						}
						setOrderDetails(response);
						endAllEditing();
					});
				});
			break;
		} else {
			editBoxInput.style.outline = "2px solid red";
		}
	}
};

export { updateBoxNumber };
