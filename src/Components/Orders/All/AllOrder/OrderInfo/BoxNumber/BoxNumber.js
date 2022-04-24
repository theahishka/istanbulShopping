import "./BoxNumber.scss";

function BoxNumber(props) {
	return (
		<h5>
			Box #:
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
			{props.editMode && !props.editBox && (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startBoxIdEditing}
				></i>
			)}
			<datalist id="box-id-list">
				{props.allBoxes &&
					props.allBoxes.map((box, index) => {
						return (
							<option
								value={box.box_id}
								key={`box-option-${index + 1}`}
							></option>
						);
					})}
			</datalist>
			{props.editBox && (
				<div style={{ display: "inline" }}>
					<i
						className={`fa-solid fa-check save-updated-box-id save-updated-box-id-${props.allOrderIndex}`}
						onClick={props.updateBoxId}
					></i>
					<i
						className={`fa-solid fa-xmark cancel-save-updated-box-id cancel-save-updated-box-id-${props.allOrderIndex}`}
						onClick={props.endBoxIdEditing}
					></i>
				</div>
			)}
		</h5>
	);
}

export { BoxNumber };
