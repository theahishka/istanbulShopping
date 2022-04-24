import { generalUX } from "../../../../utils/generalUX";
import "./OrderOverview.scss";

function OrderOverview(props) {
	let pending = props.orderInfo.pending;
	let indicatorColor;
	if (pending === "true") {
		indicatorColor = "orange";
	} else {
		indicatorColor = "green";
	}

	function formatDate(date) {
		return generalUX.formatDate(date);
	}

	return (
		<div className="order-overview" onClick={props.openOrderDetails}>
			<h5 className="order-number">
				Order #: <span>{props.orderInfo.order_id}</span>
			</h5>
			<h5 className="customer">
				Customer: <span>{props.orderInfo.customer_full_name}</span>
			</h5>
			<h5>
				Amount: <span>{props.orderInfo.total_amount.toFixed(2)}</span>
			</h5>
			<p className="date">{formatDate(props.orderInfo.date_created)}</p>
			<div
				className="order-indicator"
				style={{
					backgroundColor: `${indicatorColor}`,
				}}
			></div>
		</div>
	);
}

export { OrderOverview };
