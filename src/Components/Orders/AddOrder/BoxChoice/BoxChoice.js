import { addOrderUX } from "../utils/addOrderUX";
import "./BoxChoice.scss";

function BoxChoice(props) {
	function openQuickNewBox() {
		addOrderUX.openQuickNewBox();
	}

	function validateBoxInput(e) {
		addOrderUX.validateBoxInput(
			e,
			props.boxes,
			props.setBoxChoice,
			props.setBoxId
		);
	}

	return (
		<div className="input-wrapper">
			<label htmlFor="box-choice" className="labels">
				Box #:<span className="required-input"> *</span>
			</label>
			<div className="input-and-add-new-button">
				<input
					name="box-choice"
					id="box-choice"
					list="boxes-list"
					className="box-choice"
					placeholder="1"
					type="text"
					required
					value={props.boxChoice}
					onChange={validateBoxInput}
				/>
				<i
					className="fa-solid fa-plus add-new-button"
					onClick={openQuickNewBox}
				></i>
			</div>
			<datalist id="boxes-list">
				{!props.boxes
					? null
					: props.boxes.map((box, index) => {
							return (
								<option
									value={box.box_id}
									key={`option${index + 1}`}
								></option>
							);
					  })}
			</datalist>
		</div>
	);
}

export { BoxChoice };
