import { useState, useEffect } from "react";
import "./AddOrder.scss";
import { BoxChoice } from "./BoxChoice/BoxChoice";
import { CustomerChoice } from "./CustomerChoice/CustomerChoice";
import { NewPayments } from "./NewPayments/NewPayments";
import { NewItems } from "./NewItems/NewItems";
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

		const letters = Array.from(
			document.querySelectorAll(".element-with-ripple")
		);

		function handleMouseDown(e, letter, timerId) {
			clearTimeout(timerId);
			const ripple = e.target.querySelector(".ripple");
			const size = letter.offsetWidth;
			const pos = letter.getBoundingClientRect();
			const x = e.x - pos.left - size;
			const y = e.y - pos.top - size;
			ripple.style =
				"top:" +
				y +
				"px; left:" +
				x +
				"px; width: " +
				size * 2 +
				"px; height: " +
				size * 2 +
				"px;";
			ripple.classList.remove("active");
			ripple.classList.remove("start");
			setTimeout(() => {
				ripple.classList.add("start");
				setTimeout(() => {
					ripple.classList.add("active");
				});
			});
		}

		function handleMouseUp(e, timerId) {
			const ripple = e.target.querySelector(".ripple");
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				ripple.classList.remove("active");
				ripple.classList.remove("start");
			}, 500);
		}

		letters.forEach((letter) => {
			let timerId;

			letter.addEventListener("mousedown", function mouseDown(e) {
				handleMouseDown(e, letter, timerId);
			});

			letter.addEventListener("mouseup", function mouseUp(e) {
				handleMouseUp(e, timerId);
			});
		});

		return () => {
			const letters = Array.from(
				document.querySelectorAll(".element-with-ripple")
			);
			letters.forEach((letter) => {
				let timerId;
				letter.removeEventListener("mousedown", function mouseDown(e) {
					handleMouseDown(e, letter, timerId);
				});
				letter.removeEventListener("mouseup", function mouseUp(e) {
					handleMouseUp(e, timerId);
				});
			});
		};
	}, [updater]);

	function addAdditionalItem() {
		userExperience.addAdditionalItem(setItems);
	}

	function addAdditionalPayment() {
		userExperience.addAdditionalPayment(setPayments);
	}

	function openNewOrderForm() {
		userExperience.openNewOrderForm();
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

	function closeNewOrderForm() {
		userExperience.closeNewOrderForm();
	}

	return (
		<div className="add-order-wrapper">
			<div
				className="add-order-button element-with-ripple"
				onClick={openNewOrderForm}
			>
				ADD ORDER
				<div className="ripple"></div>
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
					<NewPayments
						payments={payments}
						addAdditionalPayment={addAdditionalPayment}
						setPayments={setPayments}
					/>
					<NewItems items={items} setItems={setItems} addAdditionalItem={addAdditionalItem}/>
					<button
						className="element-with-ripple create-order-button"
						type="submit"
						onClick={createNewOrder}
					>
						Create Order
						<div className="ripple"></div>
					</button>
				</form>
				<i
					className="far fa-times-circle"
					onClick={closeNewOrderForm}
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
				orderOutletUpdater={props.orderOutletUpdater}
				setOrderOutletUpdater={props.setOrderOutletUpdater}
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
