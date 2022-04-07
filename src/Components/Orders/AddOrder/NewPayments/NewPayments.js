import "./NewPayments.scss";
import { NewPayment } from "./NewPayment/NewPayment";

function NewPayments(props) {
	return (
		<div className="add-new-payments">
			<h3>Payments</h3>
			{props.payments.map((payment, index) => {
				return (
					<NewPayment
						payment={payment}
						index={index}
						setPayments={props.setPayments}
						payments={props.payments}
						key={`new-payment-${index + 1}`}
					/>
				);
			})}
			<div
				className="add-additional-payment-button-add-order"
				onClick={props.addAdditionalPayment}
			>
				Add Payment
			</div>
		</div>
	);
}

export { NewPayments };
