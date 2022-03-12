import { useState, useEffect } from "react";
import "./AddOrder.scss";
import { BoxChoice } from "./BoxChoice/BoxChoice";
import { CustomerChoice } from "./CustomerChoice/CustomerChoice";
import { NewItem } from "./NewItem/NewItem";
import { NewPayment } from "./NewPayment/NewPayment";
import { userExperience } from "./utils/userExperience";
import { QuickNewCustomer } from "./QuickNewCustomer/QuickNewCustomer";
import { QuickNewBox } from "./QuickNewBox/QuickNewBox";
import { istanbul } from "../../../utils/istanbul";
import { LoadingSpinner } from "../../utils/LoadingSpinner";

function AddOrder(props) {
	const [loading, setLoading] = useState(false);
	const [notifyCreation, setNotifyCreation] = useState(false);
	const [updater, setUpdater] = useState(false);
	const [customers, setCustomers] = useState(null);
	const [customerId, setCustomerId] = useState("");
	const [customerChoice, setCustomerChoice] = useState("");
	const [customerFullName, setCustomerFullName] = useState("");
	const [boxes, setBoxes] = useState(null);
	const [boxChoice, setBoxChoice] = useState("");
	const [boxId, setBoxId] = useState("");
	const [items, setItems] = useState([
		{
			brand: "",
			name: "",
			type: "",
			color: "",
			size: "",
			sellingPrice: "",
			buyingPrice: "",
		},
	]);
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		istanbul.getAllCustomers().then((response) => {
			return setCustomers(response);
		});
		istanbul.getAllBoxes().then((response) => {
			return setBoxes(response);
		});
	}, [updater]);

	function addAdditionalItem() {
		userExperience.addAdditionalItem(setItems);
	}

	function addAdditionalPayment() {
		userExperience.addAdditionalPayment(setPayments);
	}

	function createNewOrder(e) {
		userExperience.createNewOrder(
			e,
			items,
			payments,
			customerChoice,
			boxChoice,
			customerId,
			boxId,
			customerFullName,
			istanbul,
			setLoading,
			setNotifyCreation,
			props.setOrderOutletUpdater,
			props.orderOutletUpdater,
			setItems,
			setPayments,
			setCustomerId,
			setBoxId,
			setCustomerChoice,
			setBoxChoice,
			setCustomerFullName
		);
	}

	return (
		<div className="add-order-wrapper">
			<div
				className="add-order-button"
				onClick={userExperience.openNewOrderForm}
			>
				ADD ORDER
			</div>
			<section className="add-order-form-wrapper">
				<h3>New Order</h3>
				<form className="add-order-form">
					<CustomerChoice
						setCustomerId={setCustomerId}
						customers={customers}
						setCustomers={setCustomers}
						customerChoice={customerChoice}
						setCustomerChoice={setCustomerChoice}
						setCustomerFullName={setCustomerFullName}
					/>
					<BoxChoice
						setBoxId={setBoxId}
						boxes={boxes}
						setBoxes={setBoxes}
						boxChoice={boxChoice}
						setBoxChoice={setBoxChoice}
					/>
					<div className="add-new-payments">
						<h3>Payments</h3>
						{payments.map((payment, index) => {
							return (
								<NewPayment
									payment={payment}
									index={index}
									setPayments={setPayments}
									payments={payments}
									key={`new-payment-${index + 1}`}
								/>
							);
						})}
						<div
							className="add-additional-payment-button"
							onClick={addAdditionalPayment}
						>
							Add Payment
						</div>
					</div>
					<div className="add-new-items">
						<h3>Items</h3>
						{items.map((item, index) => {
							return (
								<NewItem
									items={items}
									item={item}
									index={index}
									setItems={setItems}
									key={`new-item-${index + 1}`}
								/>
							);
						})}
						<div
							className="add-additional-item-button"
							onClick={addAdditionalItem}
						>
							Add Item
						</div>
					</div>
					<button type="submit" onClick={createNewOrder}>
						Create Order
					</button>
				</form>
				<i
					className="far fa-times-circle"
					onClick={userExperience.closeNewOrderForm}
				></i>
			</section>
			<QuickNewCustomer
				updater={updater}
				setUpdater={setUpdater}
				setCustomerChoice={setCustomerChoice}
				setCustomerId={setCustomerId}
				setCustomerFullName={setCustomerFullName}
			/>
			<QuickNewBox
				updater={updater}
				setUpdater={setUpdater}
				setBoxChoice={setBoxChoice}
				setBoxId={setBoxId}
			/>
			{!loading ? null : (
				<div className="add-order-spinner-wrapper">
					<LoadingSpinner />
				</div>
			)}
			{!notifyCreation ? null : (
				<div className="add-order-notify-creation">
					<p>New Order Id:</p>
					<p className="newly-created-order-id">33</p>
				</div>
			)}
		</div>
	);
}

export { AddOrder };
