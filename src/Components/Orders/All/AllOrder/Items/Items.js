import "./Items.scss";
import { Item } from "./Item/Item";
import { useState } from "react";
import { istanbul } from "../../../../../utils/istanbul";
import { updateItems as updateItemsFile } from "./updateItems";
import { generalUX } from "../../../../utils/generalUX";

function Items(props) {
	const [editMode, setEditMode] = useState(false);

	const [editNewItem, setEditNewItem] = useState(false);

	const [updatedNewItem, setUpdatedNewItem] = useState({
		brand: "",
		name: "",
		type: "",
		color: "",
		size: "",
		sellingPrice: "",
		buyingPrice: "",
	});

	let editNewItemElement = editNewItem ? (
		<form
			className={`new-item-in-order-form new-item-in-order-form-${props.allOrderIndex}`}
		>
			<div className="new-item">
				<h4>New Item</h4>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="brand">
						Brand:<span className="required-input">*</span>
					</label>
					<input
						className="inputs"
						name="brand"
						id="brand"
						placeholder="Louis Vuitton"
						type="text"
						value={updatedNewItem.brand}
						onChange={validateNewItem}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="name">
						Name:<span className="required-input">*</span>
					</label>
					<input
						className="inputs"
						name="name"
						id="name"
						placeholder="Long Sleeve Shirt"
						type="text"
						value={updatedNewItem.name}
						onChange={validateNewItem}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="type">
						Type:<span className="required-input">*</span>
					</label>
					<input
						className="inputs"
						name="type"
						id="type"
						placeholder="Shirt"
						type="text"
						value={updatedNewItem.type}
						onChange={validateNewItem}
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
						value={updatedNewItem.color}
						onChange={validateNewItem}
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
						value={updatedNewItem.size}
						onChange={validateNewItem}
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="sellingPrice">
						Selling ($):<span className="required-input">*</span>
					</label>
					<input
						className="inputs"
						name="sellingPrice"
						id="sellingPrice"
						placeholder="100"
						type="number"
						value={updatedNewItem.sellingPrice}
						onChange={validateNewItem}
						required
					></input>
				</div>
				<div className="item-input-wrapper">
					<label className="labels" htmlFor="buyingPrice">
						Buying ($):<span className="required-input">*</span>
					</label>
					<input
						className="inputs"
						name="buyingPrice"
						id="buyingPrice"
						placeholder="80"
						type="number"
						value={updatedNewItem.buyingPrice}
						onChange={validateNewItem}
						required
					></input>
				</div>
				<button
					type="submit"
					className="create-new-item-in-order-button"
					onClick={createNewItem}
				>
					Create Item
				</button>
				<i
					className="far fa-times-circle create-new-item-cross-icon"
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
	function validateNewItem(e) {
		let value = e.target.value;
		let stateName = e.target.attributes.name.value;
		e.target.style.boxShadow = "";
		setUpdatedNewItem((prev) => {
			let newState = { ...prev };
			newState[stateName] = value;
			return newState;
		});
	}

	// Create new item and update information in database
	function createNewItem(e) {
		let brand = updatedNewItem.brand;
		let name = updatedNewItem.name;
		let type = updatedNewItem.type;
		let color = updatedNewItem.color;
		let size = updatedNewItem.size;
		let buyingPrice = updatedNewItem.buyingPrice;
		let sellingPrice = updatedNewItem.sellingPrice;

		if (!brand) {
			const brandInputElement = document.querySelector(
				`.new-item-in-order-form-${props.allOrderIndex}`
			).children[0].children[1].children[1];
			brandInputElement.style.boxShadow = "0px 0px 0px 2px red";
		}
		if (!name) {
			const nameInputElement = document.querySelector(
				`.new-item-in-order-form-${props.allOrderIndex}`
			).children[0].children[2].children[1];
			nameInputElement.style.boxShadow = "0px 0px 0px 2px red";
		}

		if (!type) {
			const typeInputElement = document.querySelector(
				`.new-item-in-order-form-${props.allOrderIndex}`
			).children[0].children[3].children[1];
			typeInputElement.style.boxShadow = "0px 0px 0px 2px red";
		}

		if (!sellingPrice) {
			const sellingPriceInputElement = document.querySelector(
				`.new-item-in-order-form-${props.allOrderIndex}`
			).children[0].children[6].children[1];
			sellingPriceInputElement.style.boxShadow = "0px 0px 0px 2px red";
		}

		if (!buyingPrice) {
			const buyingPriceInputElement = document.querySelector(
				`.new-item-in-order-form-${props.allOrderIndex}`
			).children[0].children[7].children[1];
			buyingPriceInputElement.style.boxShadow = "0px 0px 0px 2px red";
		}

		if (!brand || !name || !type || !buyingPrice || !sellingPrice) {
			return;
		}

		e.preventDefault();

		generalUX.showLoader();
		return istanbul
			.postItemInOrder(props.orderInfo.order_id, updatedNewItem)
			.then(() => {
				endNewItemEditing();
				return istanbul.getSingleOrder(props.orderInfo.order_id);
			})
			.then((response) => {
				endItemsEditing();
				setEditItems((perv) => {
					let newState = {};
					response.itemsInfo.forEach((item, index) => {
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
					response.itemsInfo.forEach((item, index) => {
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
				setDeleteConfirmation((prev) => {
					let newState = {};
					response.itemsInfo.forEach((item, index) => {
						newState[`item${index + 1}`] = false;
					});
					return newState;
				});

				setUpdatedNewItem({
					brand: "",
					name: "",
					type: "",
					color: "",
					size: "",
					sellingPrice: "",
					buyingPrice: "",
				});

				if (props.orderOutletUpdater) {
					props.setOrderOutletUpdater(false);
				} else {
					props.setOrderOutletUpdater(true);
				}
				props.setOrderDetails(response);

				const allOrderElement = document.querySelector(
					`.all-order-${props.allOrderIndex}`
				);
				allOrderElement.style.maxHeight = `${
					props.calculatedMaxHeight + 700 + 500
				}px`;

				const detailedProfitBreakdownElement = document.querySelector(
					`.detailed-profit-breakdown-${props.allOrderIndex}`
				);
				detailedProfitBreakdownElement.style.maxHeight = `${
					props.calculatedMaxHeight + 500
				}px`;
				generalUX.hideLoader();
			});
	}

	// End new item editing
	function endNewItemEditing() {
		setEditNewItem(false);
	}

	// Start item editing by clicking edit
	function startItemEditing(e) {
		updateItemsFile.startItemEditing(
			e,
			setEditItems,
			setUpdatedItems,
			props.itemsInfo
		);
	}

	// Validating value from an input field and updating appropriate state
	function validateUpdatedItem(e) {
		updateItemsFile.validateUpdatedItem(e, setUpdatedItems);
	}

	// Update item detail in database and rerender new information
	function updateItems(e) {
		updateItemsFile.updateItems(
			e,
			props.itemsInfo,
			setEditItems,
			istanbul,
			props.orderInfo,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			endItemsEditing
		);
	}

	// Delete single item in database
	function deleteSingleItem(e) {
		updateItemsFile.deleteSingleItem(
			e,
			deleteConfirmation,
			setDeleteConfirmation,
			istanbul,
			props.orderInfo,
			props.itemsInfo,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			endItemsEditing
		);
	}

	function endItemEditing(e) {
		let index = Number(e.target.attributes.index.value);
		let property =
			e.target.parentElement.previousElementSibling.attributes.name.value;
		setEditItems((prev) => {
			let stateObject = { ...prev };
			stateObject[`item${index + 1}`][property] = false;
			return stateObject;
		});
	}

	// Close items editing mode
	function endItemsEditing() {
		updateItemsFile.endItemsEditing(
			setEditMode,
			setEditNewItem,
			setEditItems,
			props.itemsInfo,
			props.allOrderIndex,
			setUpdatedItems
		);
	}

	return (
		<div
			className={`detailed-profit-breakdown detailed-profit-breakdown-${props.allOrderIndex}`}
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
						endItemEditing={endItemEditing}
					/>
				);
			})}
			{editMode && editNewItemElement}
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
