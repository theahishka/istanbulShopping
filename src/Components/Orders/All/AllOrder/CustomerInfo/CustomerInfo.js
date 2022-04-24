import "./CustomerInfo.scss";
import { CustomerNumber } from "./CustomerNumber/CustomerNumber";
import { useState, useEffect } from "react";
import { istanbul } from "../../../../../utils/istanbul";
import { updateCustomerNumber } from "./updateCustomerNumber";

function CustomerInfo(props) {
	const [editMode, setEditMode] = useState(false);
	const [editCustomer, setEditCustomer] = useState(false);
	const [updatedCustomerId, setUpdatedCustomerId] = useState(
		props.customerInfo.customer_id
	);

	const [allCustomers, setAllCustomers] = useState(null);
	useEffect(() => {
		istanbul.getAllCustomers().then((response) => {
			return setAllCustomers(response);
		});
	}, []);

	function startCustomerIdEditing(e) {
		updateCustomerNumber.startCustomerIdEditing(
			e,
			setEditCustomer,
			setUpdatedCustomerId,
			props.customerInfo.customer_id,
			props.allOrderIndex
		);
	}

	function validateUpdatedCustomerId(e) {
		updateCustomerNumber.validateUpdatedCustomerId(
			e,
			setUpdatedCustomerId,
			allCustomers,
			props.allOrderIndex
		);
	}

	function updateCustomerId() {
		updateCustomerNumber.updateCustomerId(
			updatedCustomerId,
			props.customerInfo.customer_id,
			allCustomers,
			istanbul,
			props.orderInfo.order_id,
			props.orderInfo.box_id,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			endCustomerIdEditing,
			props.allOrderIndex
		);
	}

	function endCustomerIdEditing() {
		updateCustomerNumber.endCustomerIdEditing(
			setEditMode,
			setEditCustomer,
			props.allOrderIndex
		);
	}

	return (
		<div className="order-customer order-section">
			<h4>Customer Information</h4>
			<CustomerNumber
				editCustomer={editCustomer}
				startCustomerIdEditing={startCustomerIdEditing}
				updateCustomerId={updateCustomerId}
				validateUpdatedCustomerId={validateUpdatedCustomerId}
				updatedCustomerId={updatedCustomerId}
				editMode={editMode}
				customerInfo={props.customerInfo}
				allCustomers={allCustomers}
				allOrderIndex={props.allOrderIndex}
				endCustomerIdEditing={endCustomerIdEditing}
			/>
			<h5>
				Full Name:<span>{props.customerInfo.full_name}</span>
			</h5>
			<h5>
				Address:<span>{props.customerInfo.address}</span>
			</h5>
			<h5>
				Phone Number:<span>{props.customerInfo.phone}</span>
			</h5>
			<h5>
				Comments:<span>{props.customerInfo.comments}</span>
			</h5>
			{editMode ? (
				<p
					className="toggle-edit-text done-edit-text"
					onClick={endCustomerIdEditing}
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

export { CustomerInfo };
