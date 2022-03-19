import "./Payments.scss";

function Payments(props) {
	function startPaymentEditing(e) {
		let index = Number(e.target.attributes.index.value);
		props.setEditPayments((prev) => {
			let newState = { ...prev };
			newState[`payment${index + 1}`] = true;
			return newState;
		});

		props.setUpdatedPayments((prev) => {
			let stateObject = { ...prev };
			stateObject[`payment${index + 1}`].amount =
				props.paymentsInfo[index].amount;
			return stateObject;
		});

		e.target.style.display = "none";
		const saveUpdatedPayment = e.target.nextElementSibling;
		saveUpdatedPayment.style.display = "inline-block";
	}

	function startNewPaymentEditing(e) {
		props.setEditNewPayment(true);
		const saveNewPayment = document.querySelector(
			`.save-new-payment-${props.allOrderIndex}`
		);

		e.target.style.display = "none";
		props.setUpdatedNewPayment(0);

		saveNewPayment.style.display = "inline-block";
	}

	return (
		<div>
			{props.paymentsInfo.length > 0 ? (
				props.paymentsInfo.map((payment, index) => {
					return (
						<h6 key={`payment${index + 1}`}>
							Payment {index + 1}:{" "}
							{props.editPayments[`payment${index + 1}`] ? (
								<input
									className="edit-payment-input"
									type="number"
									value={
										props.updatedPayments[
											`payment${index + 1}`
										].amount
									}
									onChange={props.validateUpdatedPayments}
									index={index}
								></input>
							) : (
								<span className="individual-payment">
									{payment.amount}$ (
									{props.formatDate(
										new Date(payment.date).toLocaleString(
											"fr-CA"
										)
									)}
									)
								</span>
							)}
							{props.editMode ? (
								<i
									className="fa-solid fa-pen edit-pen-icon"
									onClick={startPaymentEditing}
									index={index}
								></i>
							) : null}
							<i
								className={`fa-solid fa-check save-updated-payment save-updated-payment-${props.allOrderIndex}`}
								onClick={props.updatePayments}
								index={index}
							></i>
						</h6>
					);
				})
			) : (
				<h6>No Payments</h6>
			)}
			{/* New payment */}
			<h6>
				{props.editNewPayment ? "New Payment:" : null}
				{props.editNewPayment ? (
					<input
						className="new-payment-input"
						type="number"
						value={props.updatedNewPayment}
						onChange={props.validateUpdatedNewPayment}
					></input>
				) : null}
				<i
					className={`fa-solid fa-check save-new-payment save-new-payment-${props.allOrderIndex}`}
					onClick={props.createNewPayment}
				></i>
			</h6>
			{props.editMode ? (
				<div
					className="add-additional-payment-button"
					onClick={startNewPaymentEditing}
				>
					New Payment
				</div>
			) : null}
		</div>
	);
}

export { Payments };
