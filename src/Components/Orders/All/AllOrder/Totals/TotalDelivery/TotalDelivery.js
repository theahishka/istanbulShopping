import "./TotalDelivery.scss";

function TotalDelivery(props) {
	return (
		<h6>
			Total Delivery:
			{props.editTotalDelivery ? (
				<input
					className="edit-total-delivery-input"
					type="number"
					onChange={props.validateUpdatedTotalDelivery}
					value={props.updatedTotalDelivery}
				></input>
			) : (
				<span>{props.orderInfo.total_delivery_cost.toFixed(2)}$</span>
			)}
			{props.editMode && !props.editTotalDelivery && (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startTotalDeliveryEditing}
				></i>
			)}
			{props.editTotalDelivery && (
				<div style={{ display: "inline" }}>
					<i
						className={`fa-solid fa-check save-updated-total-delivery save-updated-total-delivery-${props.allOrderIndex}`}
						onClick={props.updateTotalDelivery}
					></i>
					<i
						className={`fa-solid fa-xmark cancel-save-updated-total-delivery cancel-save-updated-total-delivery-${props.allOrderIndex}`}
						onClick={props.endTotalDeliveryEditing}
					></i>
				</div>
			)}
		</h6>
	);
}

export { TotalDelivery };
