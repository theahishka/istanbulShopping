import { userExperience } from "../utils/userExperience";
import "./CustomerChoice.scss";

function CustomerChoice(props) {
	function validateCustomerInput(e) {
		userExperience.validateCustomerInput(
			e,
			props.customers,
			props.setCustomerChoice,
			props.setCustomerId,
			props.setCustomerFullName
		);
	}

	return (
		<div className="input-wrapper">
			<label htmlFor="customer-choice" className="labels">
				Customer:
			</label>
			<div className="input-and-add-new-button">
				<input
					name="customer-choice-id"
					id="customer-choice-id"
					className="customer-choice-id"
					placeholder="#"
					type="text"
					disabled
				/>
				<input
					name="customer-choice"
					id="customer-choice"
					list="customers-list"
					className="customer-choice"
					placeholder="Aida Chokosheva"
					type="text"
					required
					value={props.customerChoice}
					onChange={validateCustomerInput}
				/>
				<i
					className="fa-solid fa-plus add-new-button"
					onClick={userExperience.openQuickNewCustomer}
				></i>
			</div>
			<datalist id="customers-list">
				{!props.customers
					? null
					: props.customers.map((customer, index) => {
							return (
								<option
									value={`${customer.full_name} (${customer.phone})`}
									key={`customer${index + 1}`}
								>{`${customer.full_name} (${customer.phone})`}</option>
							);
					  })}
			</datalist>
		</div>
	);
}

export { CustomerChoice };
