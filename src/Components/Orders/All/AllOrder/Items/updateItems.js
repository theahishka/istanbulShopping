import { generalUX } from "../../../../utils/generalUX";

const updateItems = {};

updateItems.startItemEditing = (
	e,
	setEditItems,
	setUpdatedItems,
	itemsInfo
) => {
	setEditItems((prev) => {
		let newState = { ...prev };
		newState[`item${Number(e.target.attributes.index.value) + 1}`][
			e.target.attributes.name.value
		] = true;
		return newState;
	});
	setUpdatedItems((prev) => {
		let newState = {};
		itemsInfo.forEach((item, index) => {
			newState[`item${index + 1}`] = {
				itemId: item.item_id,
				brand: item.brand,
				name: item.name,
				type: item.type,
				color: item.color,
				size: item.size,
				revenue: item.revenue,
				itemCost: item.item_cost,
			};
		});
		return newState;
	});
};

updateItems.validateUpdatedItem = (e, setUpdatedItems) => {
	let value = e.target.value;
	e.target.style.boxShadow = "";
	setUpdatedItems((prev) => {
		let newState = { ...prev };
		newState[`item${Number(e.target.attributes.index.value) + 1}`][
			e.target.attributes.name.value
		] = value;
		return newState;
	});
};

updateItems.updateItems = (
	e,
	itemsInfo,
	setEditItems,
	istanbul,
	orderInfo,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	endItemsEditing
) => {
	let index = Number(e.target.attributes.index.value);
	let inputElement = e.target.parentElement.previousElementSibling;
	let type = inputElement.attributes.type.value;
	let value = inputElement.value;
	let sqlname = inputElement.attributes.sqlname.value;
	let name = inputElement.attributes.name.value;
	let itemId = itemsInfo[index].item_id;

	function endSingleItemInputEditing() {
		return setEditItems((prev) => {
			let newState = { ...prev };
			newState[`item${index + 1}`][name] = false;
			return newState;
		});
	}

	function updateSingleItemInput() {
		generalUX.showLoader();
		istanbul
			.putItemsInOrder(
				orderInfo.order_id,
				itemId,
				sqlname,
				value,
				itemsInfo[index].revenue,
				itemsInfo[index].item_cost,
				itemsInfo[index].item_delivery_cost,
				itemsInfo[index].item_airway_cost
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

				endItemsEditing();
				generalUX.hideLoader();
			});
	}

	if (type === "text") {
		if (value === itemsInfo[index][sqlname]) {
			return endSingleItemInputEditing();
		}
		if (name === "brand" || name === "name" || name === "type") {
			if (value === "") {
				return (inputElement.style.boxShadow = "0px 0px 0px 2px red");
			}
		}
		return updateSingleItemInput();
	} else {
		if (Number(value) === itemsInfo[index][sqlname]) {
			return endSingleItemInputEditing();
		}
		if (value === "" || Number(value) === 0) {
			return (inputElement.style.boxShadow = "0px 0px 0px 2px red");
		}
		return updateSingleItemInput();
	}
};

updateItems.deleteSingleItem = (
	e,
	deleteConfirmation,
	setDeleteConfirmation,
	istanbul,
	orderInfo,
	itemsInfo,
	orderOutletUpdater,
	setOrderOutletUpdater,
	setOrderDetails,
	endItemsEditing
) => {
	let index = Number(e.target.attributes.index.value);
	const countdownElement = e.target.firstElementChild;
	let intervals = {};
	if (deleteConfirmation[`item${index + 1}`] === false) {
		let seconds = 0;
		countdownElement.style.background =
			"conic-gradient(#10171E 0deg, #F0F1F3 0deg)";
		setDeleteConfirmation((prev) => {
			let newState = { ...prev };
			newState[`item${index + 1}`] = true;
			return newState;
		});

		intervals[`interval${index + 1}`] = setInterval(() => {
			seconds = seconds + 0.01;
			countdownElement.style.background = `conic-gradient(#10171E ${
				(seconds / 1) * 360
			}deg, #F0F1F3 ${(seconds / 1) * 360}deg)`;
			if (seconds > 1) {
				countdownElement.style.background =
					"conic-gradient(#10171E 0deg, #E7BF72 0deg)";
				setDeleteConfirmation((prev) => {
					let newState = { ...prev };
					newState[`item${index + 1}`] = false;
					return newState;
				});
				clearInterval(intervals[`interval${index + 1}`]);
			}
		}, 10);
	} else if (deleteConfirmation[`item${index + 1}`] === true) {
		setDeleteConfirmation((prev) => {
			let newState = { ...prev };
			newState[`item${index + 1}`] = false;
			return newState;
		});

		generalUX.showLoader();
		istanbul
			.deleteItemInOrder(orderInfo.order_id, itemsInfo[index].item_id)
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
				endItemsEditing();
				generalUX.hideLoader();
			});
	}
};

updateItems.endItemsEditing = (
	setEditMode,
	setEditNewItem,
	setEditItems,
	itemsInfo,
	allOrderIndex,
	setUpdatedItems
) => {
	setEditMode(false);
	setEditNewItem(false);
	setEditItems((prev) => {
		let newState = {};
		itemsInfo.forEach((item, index) => {
			newState[`item${index + 1}`] = {
				brand: false,
				name: false,
				type: false,
				color: false,
				size: false,
				revenue: false,
				itemCost: false,
			};
		});
		return newState;
	});
	setUpdatedItems((prev) => {
		let newState = {};
		itemsInfo.forEach((item, index) => {
			newState[`item${index + 1}`] = {
				itemId: item.item_id,
				brand: item.brand,
				name: item.name,
				type: item.type,
				color: item.color,
				size: item.size,
				revenue: item.revenue,
				itemCost: item.item_cost,
			};
		});
		return newState;
	});
};

export { updateItems };
