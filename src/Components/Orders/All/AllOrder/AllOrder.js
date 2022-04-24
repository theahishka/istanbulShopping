import { useState } from "react";
import "./AllOrder.scss";
import { CustomerInfo } from "./CustomerInfo/CustomerInfo";
import { OrderInfo } from "./OrderInfo/OrderInfo";
import { Totals } from "./Totals/Totals";
import { OrderOverview } from "./OrderOverview/OrderOverview";
import { allOrderUX } from "./utils/allOrderUX";
import { istanbul } from "../../../../utils/istanbul";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";
import { Items } from "./Items/Items";

function AllOrder(props) {
	const [orderDetails, setOrderDetails] = useState(null);

	const [detailedProfitBreakdownOpened, setDetailedProfitBreakdownOpened] =
		useState(false);

	// Dynamic calculation of max height for smoother closing and opening animation of a single order
	let calculatedMaxHeight =
		550 * props.orderInfo.number_of_items +
		24 * props.orderInfo.number_of_payments +
		1000;

	const toggleDetailedProfitBreakdown = (e) => {
		allOrderUX.toggleDetailedProfitBreakdown(
			e,
			detailedProfitBreakdownOpened,
			setDetailedProfitBreakdownOpened
		);
	};

	const closeOrderDetails = (e) => {
		allOrderUX.closeOrderDetails(
			e,
			setDetailedProfitBreakdownOpened,
			setOrderDetails
		);
	};

	const openOrderDetails = (e) => {
		allOrderUX.openOrderDetails(
			e,
			calculatedMaxHeight,
			props.orderInfo.order_id,
			setOrderDetails,
			istanbul,
			orderDetails
		);
	};

	return (
		<div className={`all-order all-order-${props.allOrderIndex}`}>
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
							allOrderIndex={props.allOrderIndex}
							setOrderDetails={setOrderDetails}
							orderOutletUpdater={props.orderOutletUpdater}
							setOrderOutletUpdater={props.setOrderOutletUpdater}
						/>
						<Items
							detailedProfitBreakdownOpened={
								detailedProfitBreakdownOpened
							}
							calculatedMaxHeight={calculatedMaxHeight}
							itemsInfo={orderDetails.itemsInfo}
							allOrderIndex={props.allOrderIndex}
							orderInfo={props.orderInfo}
							setOrderDetails={setOrderDetails}
							orderOutletUpdater={props.orderOutletUpdater}
							setOrderOutletUpdater={props.setOrderOutletUpdater}
						/>
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
