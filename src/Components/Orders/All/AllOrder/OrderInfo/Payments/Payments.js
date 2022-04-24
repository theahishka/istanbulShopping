import "./Payments.scss";

function Payments(props) {
	return (
		<div>
			{props.paymentsInfo.length > 0 ? (
				props.paymentsInfo.map((payment, index) => {
					return (
						<h6 key={`payment${index + 1}`}>
							Payment {index + 1}:
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
									{payment.amount.toFixed(2)}$ (
									{props.formatDate(
										new Date(payment.date).toLocaleString(
											"fr-CA"
										)
									)}
									)
								</span>
							)}
							{props.editMode &&
								!props.editPayments[`payment${index + 1}`] && (
									<i
										className="fa-solid fa-pen edit-pen-icon"
										onClick={props.startPaymentEditing}
										index={index}
									></i>
								)}
							{props.editPayments[`payment${index + 1}`] && (
								<div style={{ display: "inline" }}>
									<i
										className={`fa-solid fa-check save-updated-payment save-updated-payment-${props.allOrderIndex}`}
										onClick={props.updatePayments}
										index={index}
									></i>
									<i
										className={`fa-solid fa-xmark cancel-save-updated-payment cancel-save-updated-payment-${props.allOrderIndex}`}
										onClick={props.endPaymentsEditing}
										index={index}
									></i>
								</div>
							)}
						</h6>
					);
				})
			) : (
				<h6>No Payments</h6>
			)}
			{/* New payment */}
			<h6>
				{props.editNewPayment && "New Payment:"}
				{props.editNewPayment && (
					<input
						className="new-payment-input"
						type="number"
						value={props.updatedNewPayment}
						onChange={props.validateUpdatedNewPayment}
					></input>
				)}
				{props.editNewPayment && (
					<div style={{ display: "inline" }}>
						<i
							className={`fa-solid fa-check save-new-payment save-new-payment-${props.allOrderIndex}`}
							onClick={props.createNewPayment}
						></i>
						<i
							className={`fa-solid fa-xmark cancel-save-new-payment cancel-save-new-payment-${props.allOrderIndex}`}
							onClick={props.endNewPaymentEditing}
						></i>
					</div>
				)}
			</h6>
			{props.editMode && !props.editNewPayment && (
				<div
					className="add-additional-payment-button"
					onClick={props.startNewPaymentEditing}
				>
					New Payment
				</div>
			)}
		</div>
	);
}

export { Payments };
