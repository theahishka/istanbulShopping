import "./DeliveredDate.scss";

function DeliveredDate(props) {
	return (
		<h5>
			Delivered Date:
			{props.editDeliveredDate ? (
				<input
					className="edit-delivered-date-input"
					type="date"
					value={props.updatedDeliveredDate}
					onChange={props.validateUpdatedDeliveredDate}
				></input>
			) : (
				<span>
					{!props.orderInfo.date_delivered
						? "Not Delivered"
						: props.formatDate(
								new Date(
									props.orderInfo.date_delivered
								).toLocaleString("fr-CA")
						  )}
				</span>
			)}
			{props.editMode && !props.editDeliveredDate && (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startDeliveredDateEditing}
				></i>
			)}
			{props.editDeliveredDate && (
				<div style={{display: "inline"}}>
					<i
						className={`fa-solid fa-check save-updated-delivered-date save-updated-delivered-date-${props.allOrderIndex}`}
						onClick={props.updateDeliveredDate}
					></i>
					<i
						className={`fa-solid fa-xmark cancel-save-updated-delivered-date cancel-save-updated-delivered-date-${props.allOrderIndex}`}
						onClick={props.endDeliveredDateEditing}
					></i>
				</div>
			)}
		</h5>
	);
}

export { DeliveredDate };
