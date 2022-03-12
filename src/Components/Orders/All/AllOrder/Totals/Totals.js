import "./Totals.scss";

function Totals(props) {
	return (
		<div className="totals">
			<h5>
				Total Revenue:{" "}
				<span className="total-revenue">
					{props.orderInfo.total_revenue}$
				</span>
			</h5>
			<h5>
				Total Costs:{" "}
				<span className="total-cost">
					{props.orderInfo.total_costs}$
				</span>
			</h5>
			<h6>
				Total Item: <span>{props.orderInfo.total_item_cost}$</span>
			</h6>
			<h6>
				Total Delivery:{" "}
				<span>{props.orderInfo.total_delivery_cost}$</span>
			</h6>
			<h6>
				Total Airway: <span>{props.orderInfo.total_airway_cost}$</span>
			</h6>
			<h5>
				Total Profit:{" "}
				<span className="total-profit">
					{props.orderInfo.total_profit}$
				</span>
			</h5>
		</div>
	);
}

export { Totals };
