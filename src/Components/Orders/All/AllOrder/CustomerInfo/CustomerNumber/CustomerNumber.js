import "./CustomerNumber.scss";

function CustomerNumber(props) {
	return (
		<h5>
			Customer #:{" "}
			{props.editCustomer ? (
				<input
					className={`edit-customer-input edit-customer-input-${props.allOrderIndex}`}
					value={props.updatedCustomerId}
					onChange={props.validateUpdatedCustomerId}
					list="customer-id-list"
				></input>
			) : (
				<span className="customer-id">
					{props.customerInfo.customer_id}
				</span>
			)}
			{props.editMode ? (
				<i
					className="fa-solid fa-pen edit-pen-icon"
					onClick={props.startCustomerIdEditing}
				></i>
			) : null}
			<datalist id="customer-id-list">
				{!props.allCustomers
					? null
					: props.allCustomers.map((customer, index) => {
							return (
								<option
									value={customer.customer_id}
									key={`customer-option-${index + 1}`}
								></option>
							);
					  })}
			</datalist>
			<i
				className={`fa-solid fa-check save-updated-customer-id save-updated-customer-id-${props.allOrderIndex}`}
				onClick={props.updateCustomerId}
			></i>
		</h5>
	);
}

export { CustomerNumber };
