import "./CustomerInfo.scss";

function CustomerInfo(props) {
	return (
		<div className="order-customer order-section">
			<h4>Customer Information</h4>
			<h5>
				Customer #:{" "}
				<span className="customer-id">
					{props.customerInfo.customer_id}
				</span>
			</h5>
			<h5>
				Full Name: <span>{props.customerInfo.full_name}</span>
			</h5>
			<h5>
				Address: <span>{props.customerInfo.address}</span>
			</h5>
			<h5>
				Phone Number: <span>{props.customerInfo.phone}</span>
			</h5>
			<h5>
				Comments: <span>{props.customerInfo.comments}</span>
			</h5>
		</div>
	);
}

export { CustomerInfo };
