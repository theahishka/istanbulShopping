import { useState } from "react";
import "./AllOrder.scss";
import { CustomerInfo } from "./CustomerInfo/CustomerInfo";
import { OrderInfo } from "./OrderInfo/OrderInfo";
import { Totals } from "./Totals/Totals";

import { OrderOverview } from "./OrderOverview/OrderOverview";
import { userExperience } from "./utils/userExperience";
import { istanbul } from "../../../../utils/istanbul";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";
import { Items } from "./Items/Items";

function AllOrder(props) {
	const [orderDetails, setOrderDetails] = useState(null);
	const [editMode, setEditMode] = useState(false);

	const [detailedProfitBreakdownOpened, setDetailedProfitBreakdownOpened] =
		useState(false);

	const toggleDetailedProfitBreakdown = (e) => {
		userExperience.toggleDetailedProfitBreakdown(
			e,
			detailedProfitBreakdownOpened,
			setDetailedProfitBreakdownOpened
		);
	};

	// Dynamic calculation of max height for smoother closing and opening animation of a single order
	let numberOfItems = props.orderInfo.number_of_items;
	let numberOfPayments = props.orderInfo.number_of_payments;
	let calculatedMaxHeight = 450 * numberOfItems + 24 * numberOfPayments;

	const closeOrderDetails = (e) => {
		userExperience.closeOrderDetails(
			e,
			setDetailedProfitBreakdownOpened,
			setOrderDetails,
			editMode
		);
	};

	const openOrderDetails = (e) => {
		userExperience.openOrderDetails(
			e,
			calculatedMaxHeight,
			props.orderInfo.order_id,
			setOrderDetails,
			istanbul,
			orderDetails
		);
	};

	return (
		<div className="all-order">
			<LoadingSpinner />
			<OrderOverview
				openOrderDetails={openOrderDetails}
				orderInfo={props.orderInfo}
			/>

			{!orderDetails ? null : (
				<div className="detailed-order">
					<OrderInfo
						orderInfo={props.orderInfo}
						customerInfo={orderDetails.customerInfo}
						paymentsInfo={orderDetails.paymentsInfo}
						orderOutletUpdater={props.orderOutletUpdater}
						setOrderOutletUpdater={props.setOrderOutletUpdater}
						setOrderDetails={setOrderDetails}
						allOrderIndex={props.allOrderIndex}
					/>
					<CustomerInfo
						customerInfo={orderDetails.customerInfo}
						orderInfo={props.orderInfo}
						orderOutletUpdater={props.orderOutletUpdater}
						setOrderOutletUpdater={props.setOrderOutletUpdater}
						setOrderDetails={setOrderDetails}
						allOrderIndex={props.allOrderIndex}
					/>
					<div className="order-profit-breakdown order-section">
						<h4>Profit Breakdown</h4>
						<Totals
							orderInfo={props.orderInfo}
							editMode={editMode}
							setEditMode={setEditMode}
						/>
						<Items
							detailedProfitBreakdownOpened={
								detailedProfitBreakdownOpened
							}
							calculatedMaxHeight={calculatedMaxHeight}
							itemsInfo={orderDetails.itemsInfo}
						/>
						<p
							className="show-details"
							onClick={toggleDetailedProfitBreakdown}
						>
							{detailedProfitBreakdownOpened ? "Hide" : "Show"}{" "}
							items
						</p>
						{editMode ? (
							<p
								className="toggle-edit-text done-edit-text"
								onClick={() => setEditMode(false)}
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
					<i
						className="far fa-times-circle order-details-cross-icon"
						onClick={closeOrderDetails}
					></i>
				</div>
			)}
		</div>
	);
}

export { AllOrder };
