import "./TotalDelivery.scss";

function TotalDelivery(props) {
	return (
		<h6>
			Total Delivery:{" "}
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
			{props.editMode ? (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startTotalDeliveryEditing}
				></i>
			) : null}
			<i
				className={`fa-solid fa-check save-updated-total-delivery save-updated-total-delivery-${props.allOrderIndex}`}
				onClick={props.updateTotalDelivery}
			></i>
		</h6>
	);
}

export { TotalDelivery };
