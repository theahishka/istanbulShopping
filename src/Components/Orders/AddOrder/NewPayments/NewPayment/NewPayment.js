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
		const inputField = document.querySelector(
			`.new-payment-${property}-input-${props.index + 1}`
		);
		inputField.style.boxShadow = "";
	}

	function deleteAdditionalPayment(e) {
		props.setPayments((prev) => {
			let newPayments = [...prev];
			newPayments.splice(props.index, 1);
			return newPayments;
		});
	}

	return (
		<div className={`new-payment new-payment-${props.index + 1}`}>
			<h4>Payment {props.index + 1}</h4>
			<div className="payment-input-wrapper">
				<label className="labels" htmlFor="amount">
					Amount ($):<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-payment-amount-input-${
						props.index + 1
					}`}
					name="amount"
					id="amount"
					placeholder="300"
					type="number"
					required
					onChange={changePaymentInfoState}
					value={props.payments.amount}
				></input>
			</div>
			<div className="payment-input-wrapper">
				<label className="labels" htmlFor="date">
					Date:<span className="required-input"> *</span>
				</label>
				<input
					className={`inputs new-payment-date-input-${
						props.index + 1
					}`}
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
