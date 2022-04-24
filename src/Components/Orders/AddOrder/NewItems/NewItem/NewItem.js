import "./NewItem.scss";

function NewItem(props) {
	function changeItemInfoState(e) {
		let property = e.target.attributes[1].textContent;
		let value = e.target.value;
		props.setItems((prev) => {
			let newItems = [...prev];
			newItems[props.index][property] = value;
			return newItems;
		});
		const inputField = document.querySelector(
			`.new-item-${property}-input-${props.index + 1}`
		);

		if (inputField) {
			inputField.style.boxShadow = "";
		}
	}

	function deleteAdditionalItem(e) {
		if (props.items.length > 1) {
			props.setItems((prev) => {
				let newItems = [...prev];
				newItems.splice(props.index, 1);
				return newItems;
			});
		}
	}

	return (
		<div className="new-item">
			<h4>
				Item <span>{props.index + 1}</span>
			</h4>
			<div className="item-input-wrapper">
				<label className="labels" htmlFor="brand">
					Brand:<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-item-brand-input-${props.index + 1}`}
					name="brand"
					id="brand"
					placeholder="Louis Vuitton"
					type="text"
					value={props.item.brand}
					onChange={changeItemInfoState}
					required
				></input>
			</div>
			<div className="item-input-wrapper">
				<label className="labels" htmlFor="name">
					Name:<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-item-name-input-${props.index + 1}`}
					name="name"
					id="name"
					placeholder="Long Sleeve Shirt"
					type="text"
					value={props.item.name}
					onChange={changeItemInfoState}
					required
				></input>
			</div>
			<div className="item-input-wrapper">
				<label className="labels" htmlFor="type">
					Type:<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-item-type-input-${props.index + 1}`}
					name="type"
					id="type"
					placeholder="Shirt"
					type="text"
					value={props.item.type}
					onChange={changeItemInfoState}
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
					value={props.item.color}
					onChange={changeItemInfoState}
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
					value={props.item.size}
					onChange={changeItemInfoState}
				></input>
			</div>
			<div className="item-input-wrapper">
				<label className="labels" htmlFor="sellingPrice">
					Selling ($):<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-item-sellingPrice-input-${
						props.index + 1
					}`}
					name="sellingPrice"
					id="sellingPrice"
					placeholder="100"
					type="number"
					value={props.item.sellingPrice}
					onChange={changeItemInfoState}
					required
				></input>
			</div>
			<div className="item-input-wrapper">
				<label className="labels" htmlFor="buyingPrice">
					Buying ($):<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-item-buyingPrice-input-${
						props.index + 1
					}`}
					name="buyingPrice"
					id="buyingPrice"
					placeholder="80"
					type="number"
					value={props.item.buyingPrice}
					onChange={changeItemInfoState}
					required
				></input>
			</div>
			{props.items.length > 1 ? (
				<div className="delete-new-item" onClick={deleteAdditionalItem}>
					{" "}
					Delete Item
				</div>
			) : null}
		</div>
	);
}

export { NewItem };
