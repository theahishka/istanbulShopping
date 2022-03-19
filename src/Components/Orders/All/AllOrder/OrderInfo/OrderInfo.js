import { useState, useEffect } from "react";
import "./OrderInfo.scss";
import { istanbul } from "../../../../../utils/istanbul";
import { BoxNumber } from "./BoxNumber/BoxNumber";
import { DeliveredDate } from "./DeliveredDate/DeliveredDate";
import { Payments } from "./Payments/Payments";
import { updateBoxNumber } from "./updateBoxNumber";
import { updateDeliveredDate as updateDeliveredDateFile } from "./updateDeliveredDate";

function OrderInfo(props) {
	const [editMode, setEditMode] = useState(false);

	// Code for editing box Id, part 1
	const [editBox, setEditBox] = useState(false);
	const [updatedBoxId, setUpdatedBoxId] = useState(props.orderInfo.box_id);
	const [allBoxes, setAllBoxes] = useState(null);
	useEffect(() => {
		istanbul.getAllBoxes().then((response) => {
			return setAllBoxes(response);
		});
	}, []);

	// Code for editing delivery date part 1
	const [editDeliveredDate, setEditDeliveredDate] = useState(false);
	const [updatedDeliveredDate, setUpdatedDeliveredDate] = useState(
		props.orderInfo.date_delivered
	);

	// Code for editing payments part 1
	const [editPayments, setEditPayments] = useState(() => {
		let stateObject = {};
		for (let i = 0; i < props.paymentsInfo.length; i++) {
			stateObject[`payment${i + 1}`] = false;
		}
		return stateObject;
	});
	const [updatedPayments, setUpdatedPayments] = useState(() => {
		let stateObject = {};
		for (let i = 0; i < props.paymentsInfo.length; i++) {
			stateObject[`payment${i + 1}`] = {
				amount: props.paymentsInfo[i].amount,
				paymentId: props.paymentsInfo[i].payment_id,
			};
		}
		return stateObject;
	});

	const [orderInfoUpdater, setOrderInfoUpdater] = useState(true);

	useEffect(() => {
		setEditPayments(() => {
			let stateObject = {};
			for (let i = 0; i < props.paymentsInfo.length; i++) {
				stateObject[`payment${i + 1}`] = false;
			}
			return stateObject;
		});
		setUpdatedPayments(() => {
			let stateObject = {};
			for (let i = 0; i < props.paymentsInfo.length; i++) {
				stateObject[`payment${i + 1}`] = {
					amount: props.paymentsInfo[i].amount,
					paymentId: props.paymentsInfo[i].payment_id,
				};
			}
			return stateObject;
		});
	}, [orderInfoUpdater]);

	const [editNewPayment, setEditNewPayment] = useState(false);
	const [updatedNewPayment, setUpdatedNewPayment] = useState(0);

	// Code for editing box Id, part 2
	function startBoxIdEditing(e) {
		updateBoxNumber.startBoxIdEditing(
			e,
			setEditBox,
			setUpdatedBoxId,
			props.orderInfo.box_id,
			props.allOrderIndex
		);
	}

	function validateUpdatedBoxId(e) {
		updateBoxNumber.validateUpdatedBoxId(
			e,
			setUpdatedBoxId,
			allBoxes,
			props.allOrderIndex
		);
	}

	function updateBoxId() {
		updateBoxNumber.updateBoxId(
			updatedBoxId,
			props.orderInfo.box_id,
			allBoxes,
			istanbul,
			props.orderInfo.order_id,
			props.customerInfo.customer_id,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			endAllEditing,
			props.allOrderIndex
		);
	}

	// Code for editing delivery date part 2
	function startDeliveredDateEditing(e) {
		updateDeliveredDateFile.startDeliveredDateEditing(
			e,
			setEditDeliveredDate,
			props.orderInfo.date_delivered,
			setUpdatedDeliveredDate,
			formatDate,
			props.allOrderIndex
		);
	}

	function validateUpdatedDeliveredDate(e) {
		updateDeliveredDateFile.validateUpdatedDeliveredDate(
			e,
			setUpdatedDeliveredDate
		);
	}

	function updateDeliveredDate() {
		updateDeliveredDateFile.updateDeliveredDate(
			props.orderInfo.date_delivered,
			updatedDeliveredDate,
			endAllEditing,
			istanbul,
			props.orderInfo.order_id,
			props.orderInfo.customer_id,
			props.orderInfo.box_id,
			props.orderInfo.outstanding,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails
		);
	}

	// Code for editing payments part 2
	function validateUpdatedPayments(e) {
		let value = e.target.value;
		let index = Number(e.target.attributes.index.value);
		setUpdatedPayments((prev) => {
			let stateObject = { ...prev };
			stateObject[`payment${index + 1}`].amount = value;
			return stateObject;
		});
	}

	function updatePayments(e) {
		let inputBox = e.target.previousElementSibling.previousElementSibling;
		let index = Number(e.target.attributes.index.value);

		if (Number(updatedPayments[`payment${index + 1}`].amount) < 0) {
			return (inputBox.style.outline = "2px solid red");
		}

		if (
			Number(updatedPayments[`payment${index + 1}`].amount) ===
			props.paymentsInfo[index].amount
		) {
			return endAllEditing();
		}

		if (updatedPayments[`payment${index + 1}`].amount === "") {
			return (inputBox.style.outline = "2px solid red");
		}

		if (Number(updatedPayments[`payment${index + 1}`].amount) === 0) {
			return istanbul
				.deletePaymentInOrder(
					props.orderInfo.order_id,
					updatedPayments[`payment${index + 1}`].paymentId
				)
				.then(() => {
					istanbul
						.getSingleOrder(props.orderInfo.order_id)
						.then((response) => {
							if (props.orderOutletUpdater) {
								props.setOrderOutletUpdater(false);
							} else {
								props.setOrderOutletUpdater(true);
							}
							props.setOrderDetails(response);
							endAllEditing();
						});
				});
		}

		inputBox.style.outline = "";

		istanbul
			.putPaymentsInOrder(
				props.orderInfo.order_id,
				updatedPayments[`payment${index + 1}`].amount,
				updatedPayments[`payment${index + 1}`].paymentId
			)
			.then(() => {
				istanbul
					.getSingleOrder(props.orderInfo.order_id)
					.then((response) => {
						if (props.orderOutletUpdater) {
							props.setOrderOutletUpdater(false);
						} else {
							props.setOrderOutletUpdater(true);
						}
						props.setOrderDetails(response);
						endAllEditing();
					});
			});
	}

	function validateUpdatedNewPayment(e) {
		let value = e.target.value;
		setUpdatedNewPayment(value);
	}

	function createNewPayment(e) {
		const newPaymentInput = e.target.previousElementSibling;

		if (updatedNewPayment === "") {
			return (newPaymentInput.style.outline = "2px solid red");
		}

		if (Number(updatedNewPayment) < 0) {
			return (newPaymentInput.style.outline = "2px solid red");
		}

		if (Number(updatedNewPayment) === 0) {
			return (newPaymentInput.style.outline = "2px solid red");
		}

		newPaymentInput.style.outline = "";

		istanbul
			.postNewPayment(props.orderInfo.order_id, updatedNewPayment)
			.then(() => {
				istanbul
					.getSingleOrder(props.orderInfo.order_id)
					.then((response) => {
						if (props.orderOutletUpdater) {
							props.setOrderOutletUpdater(false);
						} else {
							props.setOrderOutletUpdater(true);
						}
						props.setOrderDetails(response);

						if (orderInfoUpdater) {
							setOrderInfoUpdater(false);
						} else {
							setOrderInfoUpdater(true);
						}

						endAllEditing();
					});
			});
	}

	// Code for all
	function endAllEditing() {
		const saveUpdatedBoxId = document.querySelector(
			`.save-updated-box-id-${props.allOrderIndex}`
		);
		saveUpdatedBoxId.style.display = "none";
		const saveUpdatedDeliveredDate = document.querySelector(
			`.save-updated-delivered-date-${props.allOrderIndex}`
		);
		saveUpdatedDeliveredDate.style.display = "none";
		const saveUpdatedPayments = document.querySelectorAll(
			`.save-updated-payment-${props.allOrderIndex}`
		);
		saveUpdatedPayments.forEach((element) => {
			element.style.display = "none";
		});
		const saveNewPayment = document.querySelector(
			`.save-new-payment-${props.allOrderIndex}`
		);
		saveNewPayment.style.display = "none";
		setEditMode(false);
		setEditBox(false);
		setEditDeliveredDate(false);
		setEditPayments((prev) => {
			let newState = { ...prev };
			for (let i = 0; i < props.paymentsInfo.length; i++) {
				newState[`payment${i + 1}`] = false;
			}
			return newState;
		});
		setEditNewPayment(false);
	}

	function formatDate(date) {
		if (date) {
			let splittedDate = date.split("");
			let formattedDate = [];
			for (let i = 0; i < 10; i++) {
				formattedDate.push(splittedDate[i]);
			}
			return formattedDate.join("");
		}
	}

	// Rendering
	return (
		<div className="order-information order-section">
			<h4>Order Information</h4>
			<h5>
				Order #: <span>{props.orderInfo.order_id}</span>
			</h5>
			<BoxNumber
				editMode={editMode}
				orderInfo={props.orderInfo}
				editBox={editBox}
				startBoxIdEditing={startBoxIdEditing}
				updatedBoxId={updatedBoxId}
				validateUpdatedBoxId={validateUpdatedBoxId}
				allBoxes={allBoxes}
				updateBoxId={updateBoxId}
				allOrderIndex={props.allOrderIndex}
			/>
			<h5>
				Number of Items: <span>{props.orderInfo.number_of_items}</span>
			</h5>
			<h5>
				Created Date:{" "}
				<span>
					{formatDate(
						new Date(props.orderInfo.date_created).toLocaleString(
							"fr-CA"
						)
					)}
				</span>
			</h5>
			<DeliveredDate
				orderInfo={props.orderInfo}
				editMode={editMode}
				formatDate={formatDate}
				editDeliveredDate={editDeliveredDate}
				startDeliveredDateEditing={startDeliveredDateEditing}
				updatedDeliveredDate={updatedDeliveredDate}
				validateUpdatedDeliveredDate={validateUpdatedDeliveredDate}
				updateDeliveredDate={updateDeliveredDate}
				allOrderIndex={props.allOrderIndex}
			/>
			<h5>
				Total Amount: <span>{props.orderInfo.total_amount}$</span>
			</h5>
			<Payments
				paymentsInfo={props.paymentsInfo}
				formatDate={formatDate}
				editMode={editMode}
				updatePayments={updatePayments}
				editPayments={editPayments}
				setEditPayments={setEditPayments}
				allOrderIndex={props.allOrderIndex}
				updatedPayments={updatedPayments}
				setUpdatedPayments={setUpdatedPayments}
				validateUpdatedPayments={validateUpdatedPayments}
				editNewPayment={editNewPayment}
				setEditNewPayment={setEditNewPayment}
				updatedNewPayment={updatedNewPayment}
				setUpdatedNewPayment={setUpdatedNewPayment}
				validateUpdatedNewPayment={validateUpdatedNewPayment}
				createNewPayment={createNewPayment}
			/>
			<h5>
				Outstanding:{" "}
				<span className="outstanding">
					{props.orderInfo.outstanding}$
				</span>
			</h5>
			{editMode ? (
				<p
					className="toggle-edit-text done-edit-text"
					onClick={endAllEditing}
				>
					done
				</p>
			) : (
				<p
					className="toggle-edit-text"
					onClick={() => setEditMode(true)}
				>
					edit
				</p>
			)}
		</div>
	);
}

export { OrderInfo };
