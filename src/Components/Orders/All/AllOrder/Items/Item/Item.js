import "./Item.scss";

function Item(props) {
	let deleteItemElement = props.numberOfItems > 1 && (
		<div
			className="modification-delete-item"
			index={props.index}
			onClick={props.deleteSingleItem}
		>
			Delete Item
			<div className="delete-confirmation-countdown">
				<div className="delete-confirmation-countdown-inner-circle"></div>
			</div>
		</div>
	);

	return (
		<div className="item">
			<h4>Item {props.number}</h4>
			<h5>
				Brand:
				{props.editItems[`item${props.index + 1}`].brand ? (
					<input
						name="brand"
						sqlname="brand"
						type="text"
						className={`edit-item-input edit-item-input-${props.allOrderIndex}`}
						value={
							props.updatedItems[`item${props.index + 1}`].brand
						}
						onChange={props.validateUpdatedItem}
						index={props.index}
					></input>
				) : (
					<span>{props.item.brand}</span>
				)}
				{props.editMode &&
					!props.editItems[`item${props.index + 1}`].brand && (
						<i
							className="fa-solid fa-pen edit-pen-icon"
							onClick={props.startItemEditing}
							name="brand"
							index={props.index}
						></i>
					)}
				{props.editItems[`item${props.index + 1}`].brand && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
							onClick={props.updateItems}
							index={props.index}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
							onClick={props.endItemEditing}
							index={props.index}
						></i>
					</div>
				)}
			</h5>
			<h5>
				Name:
				{props.editItems[`item${props.index + 1}`].name ? (
					<input
						name="name"
						sqlname="name"
						type="text"
						className={`edit-item-input edit-item-input-${props.allOrderIndex}`}
						value={
							props.updatedItems[`item${props.index + 1}`].name
						}
						onChange={props.validateUpdatedItem}
						index={props.index}
					></input>
				) : (
					<span>{props.item.name}</span>
				)}
				{props.editMode &&
					!props.editItems[`item${props.index + 1}`].name && (
						<i
							className="fa-solid fa-pen edit-pen-icon"
							onClick={props.startItemEditing}
							name="name"
							index={props.index}
						></i>
					)}
				{props.editItems[`item${props.index + 1}`].name && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
							onClick={props.updateItems}
							index={props.index}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
							onClick={props.endItemEditing}
							index={props.index}
						></i>
					</div>
				)}
			</h5>
			<h5>
				Color:
				{props.editItems[`item${props.index + 1}`].color ? (
					<input
						name="color"
						sqlname="color"
						type="text"
						className={`edit-item-input edit-item-input-${props.allOrderIndex}`}
						value={
							props.updatedItems[`item${props.index + 1}`].color
						}
						onChange={props.validateUpdatedItem}
						index={props.index}
					></input>
				) : (
					<span>{props.item.color}</span>
				)}
				{props.editMode &&
					!props.editItems[`item${props.index + 1}`].color && (
						<i
							className="fa-solid fa-pen edit-pen-icon"
							onClick={props.startItemEditing}
							name="color"
							index={props.index}
						></i>
					)}
				{props.editItems[`item${props.index + 1}`].color && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
							onClick={props.updateItems}
							index={props.index}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
							onClick={props.endItemEditing}
							index={props.index}
						></i>
					</div>
				)}
			</h5>
			<h5>
				Type:
				{props.editItems[`item${props.index + 1}`].type ? (
					<input
						name="type"
						sqlname="type"
						type="text"
						className={`edit-item-input edit-item-input-${props.allOrderIndex}`}
						value={
							props.updatedItems[`item${props.index + 1}`].type
						}
						onChange={props.validateUpdatedItem}
						index={props.index}
					></input>
				) : (
					<span>{props.item.type}</span>
				)}
				{props.editMode &&
					!props.editItems[`item${props.index + 1}`].type && (
						<i
							className="fa-solid fa-pen edit-pen-icon"
							onClick={props.startItemEditing}
							name="type"
							index={props.index}
						></i>
					)}
				{props.editItems[`item${props.index + 1}`].type && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
							onClick={props.updateItems}
							index={props.index}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
							onClick={props.endItemEditing}
							index={props.index}
						></i>
					</div>
				)}
			</h5>
			<h5>
				Size:
				{props.editItems[`item${props.index + 1}`].size ? (
					<input
						name="size"
						sqlname="size"
						type="text"
						className={`edit-item-input edit-item-input-${props.allOrderIndex}`}
						value={
							props.updatedItems[`item${props.index + 1}`].size
						}
						onChange={props.validateUpdatedItem}
						index={props.index}
					></input>
				) : (
					<span>{props.item.size}</span>
				)}
				{props.editMode &&
					!props.editItems[`item${props.index + 1}`].size && (
						<i
							className="fa-solid fa-pen edit-pen-icon"
							onClick={props.startItemEditing}
							name="size"
							index={props.index}
						></i>
					)}
				{props.editItems[`item${props.index + 1}`].size && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
							onClick={props.updateItems}
							index={props.index}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
							onClick={props.endItemEditing}
							index={props.index}
						></i>
					</div>
				)}
			</h5>
			<div className="revenue item-finance">
				<h4 style={{ marginBottom: "0", fontSize: "1rem" }}>
					Revenue:
					{props.editItems[`item${props.index + 1}`].revenue ? (
						<input
							name="revenue"
							sqlname="revenue"
							type="number"
							className={`edit-item-input-revenue edit-item-input-${props.allOrderIndex}`}
							value={
								props.updatedItems[`item${props.index + 1}`]
									.revenue
							}
							onChange={props.validateUpdatedItem}
							index={props.index}
						></input>
					) : (
						<span>{props.item.revenue.toFixed(2)}$</span>
					)}
					{props.editMode &&
						!props.editItems[`item${props.index + 1}`].revenue && (
							<i
								className="fa-solid fa-pen edit-pen-icon"
								onClick={props.startItemEditing}
								name="revenue"
								index={props.index}
							></i>
						)}
					{props.editItems[`item${props.index + 1}`].revenue && (
						<div style={{ display: "inline" }}>
							<i
								className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
								onClick={props.updateItems}
								index={props.index}
							></i>
							<i
								className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
								onClick={props.endItemEditing}
								index={props.index}
							></i>
						</div>
					)}
				</h4>
			</div>
			<div className="costs item-finance">
				<h4 style={{ fontSize: "1rem" }}>
					Costs:<span>{props.item.item_costs.toFixed(2)}$</span>
				</h4>
				<h5>
					Item:
					{props.editItems[`item${props.index + 1}`].itemCost ? (
						<input
							name="itemCost"
							sqlname="item_cost"
							type="number"
							className={`edit-item-input-item-cost edit-item-input-${props.allOrderIndex}`}
							value={
								props.updatedItems[`item${props.index + 1}`]
									.itemCost
							}
							onChange={props.validateUpdatedItem}
							index={props.index}
						></input>
					) : (
						<span>{props.item.item_cost.toFixed(2)}$</span>
					)}
					{props.editMode &&
						!props.editItems[`item${props.index + 1}`].itemCost && (
							<i
								className="fa-solid fa-pen edit-pen-icon"
								onClick={props.startItemEditing}
								name="itemCost"
								index={props.index}
							></i>
						)}
					{props.editItems[`item${props.index + 1}`].itemCost && (
						<div style={{ display: "inline" }}>
							<i
								className={`fa-solid fa-check save-updated-item save-updated-item-${props.allOrderIndex}`}
								onClick={props.updateItems}
								index={props.index}
							></i>
							<i
								className={`fa-solid fa-xmark cancel-save-updated-item cancel-save-updated-item-${props.allOrderIndex}`}
								onClick={props.endItemEditing}
								index={props.index}
							></i>
						</div>
					)}
				</h5>
				<h5>
					Delivery:
					<span>{props.item.item_delivery_cost.toFixed(2)}$</span>
				</h5>
				<h5>
					Airway:
					<span>{props.item.item_airway_cost.toFixed(2)}$</span>
				</h5>
			</div>
			<div className="profit item-finance">
				<h4 style={{ marginBottom: "0", fontSize: "1rem" }}>
					Profit:<span>{props.item.profit.toFixed(2)}$</span>
				</h4>
			</div>
			{props.editMode && deleteItemElement}
		</div>
	);
}

export { Item };
