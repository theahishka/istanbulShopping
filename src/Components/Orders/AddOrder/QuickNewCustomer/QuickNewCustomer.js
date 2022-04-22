import "./QuickNewCustomer.scss";
import { addOrderUX } from "../utils/addOrderUX";
import { useState, useEffect } from "react";
import { istanbul } from "../../../../utils/istanbul";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";
import { createNewCustomer as createNewCustomerFile } from "./createNewCustomer";

function QuickNewCustomer(props) {
	const [loading, setLoading] = useState(false);
	const [notifyCreation, setNotifyCreation] = useState(false);

	const [newCustomer, setNewCustomer] = useState({
		fullName: "",
		address: "",
		phone: "",
		comments: "",
	});

	useEffect(() => {
		const letters = Array.from(
			document.querySelectorAll(".element-with-ripple-new-customer")
		);

		function handleMouseDown(e, letter, timerId) {
			clearTimeout(timerId);
			const ripple = e.target.querySelector(".ripple-new-customer");
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
			const ripple = e.target.querySelector(".ripple-new-customer");
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
				document.querySelectorAll(".element-with-ripple-new-customer")
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
	});

	function updateNewCustomerDetails(e) {
		createNewCustomerFile.updateNewCustomerDetails(e, setNewCustomer);
	}

	function createNewCustomer(e) {
		createNewCustomerFile.createNewCustomer(
			e,
			newCustomer,
			setNewCustomer,
			setLoading,
			props.updater,
			props.setUpdater,
			props.setCustomerChoice,
			istanbul,
			props.setCustomerId,
			props.setCustomerFullName,
			setNotifyCreation,
		);
	}

	function closeQuickNewCustomer() {
		addOrderUX.closeQuickNewCustomer();
	}

	return (
		<section className="quick-new-customer-wrapper" visible="true">
			<form className="quick-new-customer-form">
				<h3>Create New Customer</h3>
				<div className="quick-customer-input-wrapper">
					<label
						htmlFor="fullName"
						className="quick-new-customer-label"
					>
						Full Name:<span className="required-input"> *</span>
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
						Address:<span className="required-input"> *</span>
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
						Phone Number:<span className="required-input"> *</span>
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
				<button
					type="submit"
					className="element-with-ripple-new-customer"
					onClick={createNewCustomer}
				>
					Create Customer
					<div className="ripple-new-customer"></div>
				</button>
			</form>
			{!loading ? null : (
				<div className="quick-new-customer-spinner-wrapper">
					<LoadingSpinner />
				</div>
			)}
			{!notifyCreation ? null : (
				<div className="quick-new-customer-notify-creation">
					<p>New Customer Id:</p>{" "}
					<p className="newly-created-customer-id"></p>
				</div>
			)}
			<i
				className="far fa-times-circle"
				onClick={closeQuickNewCustomer}
			></i>
		</section>
	);
}

export { QuickNewCustomer };
