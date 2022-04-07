import "./Items.scss";
import { Item } from "./Item/Item";
import { useState } from "react";
import { istanbul } from "../../../../../utils/istanbul";

function Items(props) {
	const [editMode, setEditMode] = useState(false);

	const [editNewItem, setEditNewItem] = useState(false);

	let editNewItemElement = editNewItem ? (
		<form className="new-item-in-order-form">
			<div className="new-item">
				<h4>New Item</h4>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="brand">
						Brand:
					</label>
					<input
						className="inputs"
						name="brand"
						id="brand"
						placeholder="Louis Vuitton"
						type="text"
						// value={props.item.brand}
						// onChange={changeItemInfoState}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="name">
						Name:
					</label>
					<input
						className="inputs"
						name="name"
						id="name"
						placeholder="Long Sleeve Shirt"
						type="text"
						// value={props.item.name}
						// onChange={changeItemInfoState}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="type">
						Type:
					</label>
					<input
						className="inputs"
						name="type"
						id="type"
						placeholder="Shirt"
						type="text"
						// value={props.item.type}
						// onChange={changeItemInfoState}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="color">
						Color:
					</label>
					<input
						className="inputs"
						name="color"
						id="color"
						placeholder="Black"
						type="text"
						// value={props.item.color}
						// onChange={changeItemInfoState}
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="size">
						Size:
					</label>
					<input
						className="inputs"
						name="size"
						id="size"
						placeholder="Medium"
						type="text"
						// value={props.item.size}
						// onChange={changeItemInfoState}
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="sellingPrice">
						Selling ($):
					</label>
					<input
						className="inputs"
						name="sellingPrice"
						id="sellingPrice"
						placeholder="100"
						type="number"
						// value={props.item.sellingPrice}
						// onChange={changeItemInfoState}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="buyingPrice">
						Buying ($):
					</label>
					<input
						className="inputs"
						name="buyingPrice"
						id="buyingPrice"
						placeholder="80"
						type="number"
						// value={props.item.buyingPrice}
						// onChange={changeItemInfoState}
						required
					></input>
				</div>
				<div className="create-new-item-in-order-button">
					Create Item
				</div>
				<i
					className="far fa-times-circle order-details-cross-icon"
					onClick={endNewItemEditing}
				></i>
			</div>
		</form>
	) : (
		<div className="add-item-in-order" onClick={startNewItemEditing}>
			Add Item
		</div>
	);

	const [editItems, setEditItems] = useState(() => {
		let newState = {};
		props.itemsInfo.forEach((item, index) => {
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

	const [updatedItems, setUpdatedItems] = useState(() => {
		let newState = {};
		props.itemsInfo.forEach((item, index) => {
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

	const [deleteConfirmation, setDeleteConfirmation] = useState(() => {
		let newState = {};
		props.itemsInfo.forEach((item, index) => {
			newState[`item${index + 1}`] = false;
		});
		return newState;
	});

	// Start new item editing
	function startNewItemEditing() {
		setEditNewItem(true);
	}

	// Validate new item information from input field and update appropriate state
	function validateNewItem() {}

	// Create new item and update information in database
	function createNewItem() {}

	// End new item editing
	function endNewItemEditing() {
		setEditNewItem(false);
	}

	// Start item editing by clicking edit
	function startItemEditing(e) {
		setEditItems((prev) => {
			let newState = { ...prev };
			newState[`item${Number(e.target.attributes.index.value) + 1}`][
				e.target.attributes.name.value
			] = true;
			return newState;
		});
		e.target.style.display = "none";
		e.target.nextElementSibling.style.display = "inline-block";
		setUpdatedItems((prev) => {
			let newState = {};
			props.itemsInfo.forEach((item, index) => {
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
	}

	// Validating value from an input field and updating appropriate state
	function validateUpdatedItem(e) {
		let value = e.target.value;
		e.target.style.outline = "";
		setUpdatedItems((prev) => {
			let newState = { ...prev };
			newState[`item${Number(e.target.attributes.index.value) + 1}`][
				e.target.attributes.name.value
			] = value;
			return newState;
		});
	}

	// Update item detail in database and rerender new information
	function updateItems(e) {
		let index = Number(e.target.attributes.index.value);
		let inputElement =
			e.target.previousElementSibling.previousElementSibling;
		let type = inputElement.attributes.type.value;
		let value = inputElement.value;
		let sqlname = inputElement.attributes.sqlname.value;
		let name = inputElement.attributes.name.value;
		let itemId = props.itemsInfo[index].item_id;

		function endSingleItemInputEditing() {
			inputElement.style.outline = "";
			e.target.style.display = "none";
			e.target.previousElementSibling.style.display = "inline-block";
			return setEditItems((prev) => {
				let newState = { ...prev };
				newState[`item${index + 1}`][name] = false;
				return newState;
			});
		}

		function updateSingleItemInput() {
			istanbul
				.putItemsInOrder(
					props.orderInfo.order_id,
					itemId,
					sqlname,
					value,
					props.itemsInfo[index].revenue,
					props.itemsInfo[index].item_cost,
					props.itemsInfo[index].item_delivery_cost,
					props.itemsInfo[index].item_airway_cost
				)
				.then(() => {
					return istanbul.getSingleOrder(props.orderInfo.order_id);
				})
				.then((response) => {
					if (props.orderOutletUpdater) {
						props.setOrderOutletUpdater(false);
					} else {
						props.setOrderOutletUpdater(true);
					}
					props.setOrderDetails(response);

					endItemsEditing();
				});
		}

		if (type === "text") {
			if (value === props.itemsInfo[index][sqlname]) {
				return endSingleItemInputEditing();
			}
			if (name === "brand" || name === "name" || name === "type") {
				if (value === "") {
					return (inputElement.style.outline = "2px solid red");
				}
			}
			return updateSingleItemInput();
		} else {
			if (Number(value) === props.itemsInfo[index][sqlname]) {
				return endSingleItemInputEditing();
			}
			if (value === "" || Number(value) === 0) {
				return (inputElement.style.outline = "2px solid red");
			}
			return updateSingleItemInput();
		}
	}

	// Delete single item in database
	function deleteSingleItem(e) {
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
			istanbul
				.deleteItemInOrder(
					props.orderInfo.order_id,
					props.itemsInfo[index].item_id
				)
				.then(() => {
					return istanbul.getSingleOrder(props.orderInfo.order_id);
				})
				.then((response) => {
					if (props.orderOutletUpdater) {
						props.setOrderOutletUpdater(false);
					} else {
						props.setOrderOutletUpdater(true);
					}
					props.setOrderDetails(response);
					endItemsEditing();
				});
		}
	}

	// Close items editing mode
	function endItemsEditing() {
		setEditMode(false);
		setEditNewItem(false);
		setEditItems((prev) => {
			let newState = {};
			props.itemsInfo.forEach((item, index) => {
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
		const saveUpdatedItems = document.querySelectorAll(
			`.save-updated-item-${props.allOrderIndex}`
		);
		saveUpdatedItems.forEach((element) => {
			element.style.display = "none";
		});
		setUpdatedItems((prev) => {
			let newState = {};
			props.itemsInfo.forEach((item, index) => {
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
	}

	return (
		<div
			className={`detailed-profit-breakdown`}
			style={{
				maxHeight: `${
					props.detailedProfitBreakdownOpened
						? props.calculatedMaxHeight
						: 0
				}px`,
			}}
		>
			<h4>Items</h4>
			{props.itemsInfo.map((item, index) => {
				return (
					<Item
						item={item}
						numberOfItems={props.itemsInfo.length}
						number={index + 1}
						key={`item${index}`}
						index={index}
						editItems={editItems}
						editMode={editMode}
						allOrderIndex={props.allOrderIndex}
						startItemEditing={startItemEditing}
						validateUpdatedItem={validateUpdatedItem}
						updateItems={updateItems}
						updatedItems={updatedItems}
						deleteSingleItem={deleteSingleItem}
					/>
				);
			})}
			{editMode ? editNewItemElement : null}
			{editMode ? (
				<p
					className="toggle-edit-text done-edit-text"
					onClick={endItemsEditing}
				>
					done
				</p>
			) : (
				<p
					className="toggle-edit-text"
					onClick={() => setEditMode(true)}
				>
					edit
				</p>
			)}
		</div>
	);
}

export { Items };
