import "./DeliveredDate.scss";

function DeliveredDate(props) {
	return (
		<h5>
			Delivered Date:{" "}
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
			{props.editMode ? (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startDeliveredDateEditing}
				></i>
			) : null}
			<i
				className={`fa-solid fa-check save-updated-delivered-date save-updated-delivered-date-${props.allOrderIndex}`}
				onClick={props.updateDeliveredDate}
			></i>
		</h5>
	);
}

export { DeliveredDate };
