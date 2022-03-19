import "./BoxNumber.scss";

function BoxNumber(props) {
	return (
		<h5>
			Box #:{" "}
			{props.editBox ? (
				<input
					className={`edit-box-input edit-box-input-${props.allOrderIndex}`}
					value={props.updatedBoxId}
					onChange={props.validateUpdatedBoxId}
					list="box-id-list"
				></input>
			) : (
				<span className="box-number">{props.orderInfo.box_id}</span>
			)}
			{props.editMode ? (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startBoxIdEditing}
				></i>
			) : null}
			<datalist id="box-id-list">
				{!props.allBoxes
					? null
					: props.allBoxes.map((box, index) => {
							return (
								<option
									value={box.box_id}
									key={`box-option-${index + 1}`}
								></option>
							);
					  })}
			</datalist>
			<i
				className={`fa-solid fa-check save-updated-box-id save-updated-box-id-${props.allOrderIndex}`}
				onClick={props.updateBoxId}
			></i>
		</h5>
	);
}

export { BoxNumber };
