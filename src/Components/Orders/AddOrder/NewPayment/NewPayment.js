import "./NewPayment.scss";

function NewPayment(props) {
	function changePaymentInfoState(e) {
		let property = e.target.attributes[1].textContent;
		let value = e.target.value;
		props.setPayments((prev) => {
			let newPayments = [...prev];
			newPayments[props.index][property] = value;
			return newPayments;
		});
	}

	function deleteAdditionalPayment(e) {
		props.setPayments((prev) => {
			let newPayments = [...prev];
			newPayments.splice(props.index, 1);
			return newPayments;
		});
	}

	return (
		<div className="new-payment">
			<h4>Payment {props.index + 1}</h4>
			<div className="payment-input-wrapper">
				<label className="labels" htmlFor="amount">
					Amount ($):
				</label>
				<input
					className="inputs"
					name="amount"
					id="amount"
					placeholder="300"
					type="text"
					required
					onChange={changePaymentInfoState}
					value={props.payments.amount}
				></input>
			</div>
			<div className="payment-input-wrapper">
				<label className="labels" htmlFor="date">
					Date:
				</label>
				<input
					className="inputs"
					name="date"
					id="date"
					type="date"
					required
					onChange={changePaymentInfoState}
					value={props.payments.date}
				></input>
			</div>
			<div
				className="delete-new-payment"
				onClick={deleteAdditionalPayment}
			>
				Delete Payment
			</div>
		</div>
	);
}

export { NewPayment };
