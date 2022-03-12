import "./QuickNewCustomer.scss";
import { userExperience } from "../utils/userExperience";
import { useState } from "react";
import { istanbul } from "../../../../utils/istanbul";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";

function QuickNewCustomer(props) {
	const [loading, setLoading] = useState(false);

	const [newCustomer, setNewCustomer] = useState({
		fullName: "",
		address: "",
		phone: "",
		comments: "",
	});

	function updateNewCustomerDetails(e) {
		let property = e.target.attributes[0].textContent;
		let value = e.target.value;
		setNewCustomer((prev) => {
			let newCustomerInfo = { ...prev };
			newCustomerInfo[property] = value;
			return newCustomerInfo;
		});
	}

	function createNewCustomer(e) {
		userExperience.createNewCustomer(
			e,
			newCustomer,
			setNewCustomer,
			setLoading,
			props.updater,
			props.setUpdater,
			props.setCustomerChoice,
			istanbul,
			props.setCustomerId,
			props.setCustomerFullName
		);
	}

	return (
		<section className="quick-new-customer-wrapper">
			<form className="quick-new-customer-form">
				<h3>Create New Customer</h3>
				<div className="quick-customer-input-wrapper">
					<label
						htmlFor="fullName"
						className="quick-new-customer-label"
					>
						Full Name:
					</label>
					<input
						name="fullName"
						id="customer-full-name"
						className="quick-new-customer-input"
						type="text"
						required
						placeholder="Aida Chokosheva"
						value={newCustomer.fullName}
						onChange={updateNewCustomerDetails}
					></input>
				</div>
				<div className="quick-customer-input-wrapper">
					<label
						htmlFor="address"
						className="quick-new-customer-label"
					>
						Address:
					</label>
					<input
						name="address"
						id="customer-address"
						className="quick-new-customer-input"
						type="text"
						required
						placeholder="Tokombaeva 23/2"
						value={newCustomer.address}
						onChange={updateNewCustomerDetails}
					></input>
				</div>
				<div className="quick-customer-input-wrapper">
					<label htmlFor="phone" className="quick-new-customer-label">
						Phone Number:
					</label>
					<input
						name="phone"
						id="customer-phone-number"
						className="quick-new-customer-input"
						type="text"
						required
						placeholder="+996772245555"
						value={newCustomer.phone}
						onChange={updateNewCustomerDetails}
					></input>
				</div>
				<div className="quick-customer-input-wrapper">
					<label
						htmlFor="comments"
						className="quick-new-customer-label"
					>
						Comments:
					</label>
					<textarea
						name="comments"
						id="customer-comments"
						className="quick-new-customer-input"
						type="text"
						placeholder="Cool, low tempered."
						value={newCustomer.comments}
						onChange={updateNewCustomerDetails}
						style={{ height: "4rem", padding: "0.5rem" }}
					></textarea>
				</div>
				<button type="submit" onClick={createNewCustomer}>
					Create Customer
				</button>
			</form>
			{!loading ? null : (
				<div className="quick-new-customer-spinner-wrapper">
					<LoadingSpinner />
				</div>
			)}
			<i
				className="far fa-times-circle"
				onClick={userExperience.closeQuickNewCustomer}
			></i>
		</section>
	);
}

export { QuickNewCustomer };
