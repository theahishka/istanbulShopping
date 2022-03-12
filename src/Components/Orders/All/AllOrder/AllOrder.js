import { useState } from "react";
import "./AllOrder.scss";
import { CustomerInfo } from "./CustomerInfo/CustomerInfo";
import { OrderInfo } from "./OrderInfo/OrderInfo";
import { Totals } from "./Totals/Totals";
import { Item } from "./Item/Item";
import { OrderOverview } from "./OrderOverview/OrderOverview";
import { userExperience } from "./utils/userExperience";
import { istanbul } from "../../../../utils/istanbul";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";

function AllOrder(props) {
	const [orderDetails, setOrderDetails] = useState(null);

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
	let fixedMaxHeight = 0;

	const closeOrderDetails = (e) => {
		userExperience.closeOrderDetails(
			e,
			setDetailedProfitBreakdownOpened,
			setOrderDetails
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
						paymentsInfo={orderDetails.paymentsInfo}
					/>
					<CustomerInfo customerInfo={orderDetails.customerInfo} />
					<div className="order-profit-breakdown order-section">
						<h4>Profit Breakdown</h4>
						<Totals orderInfo={props.orderInfo} />
						<div
							className={`detailed-profit-breakdown`}
							style={{
								maxHeight: `${
									detailedProfitBreakdownOpened
										? calculatedMaxHeight
										: fixedMaxHeight
								}px`,
							}}
						>
							{orderDetails.itemsInfo.map((item, index) => {
								return (
									<Item
										item={item}
										number={index + 1}
										key={`item${index}`}
									/>
								);
							})}
						</div>
						<p
							className="show-details"
							onClick={toggleDetailedProfitBreakdown}
						>
							{detailedProfitBreakdownOpened ? "Hide" : "Show"}{" "}
							items
						</p>
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
