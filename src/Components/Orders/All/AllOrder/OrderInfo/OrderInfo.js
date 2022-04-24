import { useState, useEffect } from "react";
import "./OrderInfo.scss";
import { istanbul } from "../../../../../utils/istanbul";
import { BoxNumber } from "./BoxNumber/BoxNumber";
import { DeliveredDate } from "./DeliveredDate/DeliveredDate";
import { Payments } from "./Payments/Payments";
import { updateBoxNumber } from "./updateBoxNumber";
import { updateDeliveredDate as updateDeliveredDateFile } from "./updateDeliveredDate";
import { updatePayments as updatePaymentsFile } from "./updatePayments";
import { helperFunctions } from "./helperFunctions";
import { generalUX } from "../../../../utils/generalUX";

function OrderInfo(props) {
	// Edit mode state
	const [editMode, setEditMode] = useState(false);

	// Delete order confirmation state
	const [deleteOrderConfirmation, setDeleteOrderConfirmation] =
		useState(false);

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

	function endBoxIdEditing() {
		setEditBox(false);
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

	function endDeliveredDateEditing() {
		setEditDeliveredDate(false);
	}

	// Code for editing payments part 2
	function startPaymentEditing(e) {
		updatePaymentsFile.startPaymentEditing(
			e,
			setEditPayments,
			setUpdatedPayments,
			props.paymentsInfo
		);
	}

	function validateUpdatedPayments(e) {
		updatePaymentsFile.validateUpdatedPayments(e, setUpdatedPayments);
	}

	function updatePayments(e) {
		updatePaymentsFile.updatePayments(
			e,
			updatedPayments,
			props.paymentsInfo,
			endAllEditing,
			istanbul,
			props.orderInfo,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails
		);
	}

	function endPaymentsEditing(e) {
		let index = Number(e.target.attributes.index.value);
		setEditPayments((prev) => {
			let stateObject = { ...prev };
			stateObject[`payment${index + 1}`] = false;
			return stateObject;
		});
	}

	function startNewPaymentEditing(e) {
		updatePaymentsFile.startNewPaymentEditing(
			e,
			setEditNewPayment,
			props.allOrderIndex,
			setUpdatedNewPayment
		);
	}

	function validateUpdatedNewPayment(e) {
		updatePaymentsFile.validateUpdatedNewPayment(e, setUpdatedNewPayment);
	}

	function endNewPaymentEditing() {
		setEditNewPayment(false);
	}

	function createNewPayment(e) {
		updatePaymentsFile.createNewPayment(
			e,
			updatedNewPayment,
			istanbul,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			orderInfoUpdater,
			setOrderInfoUpdater,
			endAllEditing,
			props.orderInfo
		);
	}

	// Helper functions for all
	function deleteOrder(e) {
		helperFunctions.deleteOrder(
			e,
			deleteOrderConfirmation,
			setDeleteOrderConfirmation,
			istanbul,
			props.orderInfo,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater
		);
	}

	function endAllEditing() {
		helperFunctions.endAllEditing(
			props.allOrderIndex,
			setEditMode,
			setEditBox,
			setEditDeliveredDate,
			setEditPayments,
			props.paymentsInfo,
			setEditNewPayment
		);
	}

	function formatDate(date) {
		if (date) {
			return generalUX.formatDate(date);
		}
	}

	// Rendering
	return (
		<div className="order-information order-section">
			<h4>Order Information</h4>
			<h5>
				Order #:<span>{props.orderInfo.order_id}</span>
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
				endBoxIdEditing={endBoxIdEditing}
			/>
			<h5>
				Number of Items:<span>{props.orderInfo.number_of_items}</span>
			</h5>
			<h5>
				Created Date:
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
				endDeliveredDateEditing={endDeliveredDateEditing}
			/>
			<h5>
				Total Amount:
				<span style={{ color: "green" }}>
					{props.orderInfo.total_amount.toFixed(2)}$
				</span>
			</h5>
			<Payments
				paymentsInfo={props.paymentsInfo}
				startPaymentEditing={startPaymentEditing}
				startNewPaymentEditing={startNewPaymentEditing}
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
				endPaymentsEditing={endPaymentsEditing}
				endNewPaymentEditing={endNewPaymentEditing}
			/>
			<h5>
				Outstanding:
				<span className="outstanding">
					{props.orderInfo.outstanding.toFixed(2)}$
				</span>
			</h5>
			{editMode && (
				<div
					className="delete-order-button-wrapper"
					orderid={props.orderInfo.order_id}
					onClick={deleteOrder}
				>
					<div className="delete-order-button">
						Delete Order
						<div className="delete-order-confirmation">
							<div className="delete-order-confirmation-inner-circle"></div>
						</div>
					</div>
				</div>
			)}
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
