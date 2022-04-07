import "./Totals.scss";
import { useState } from "react";
import { TotalDelivery } from "./TotalDelivery/TotalDelivery";
import { istanbul } from "../../../../../utils/istanbul";
import { updateTotalDelivery as updateTotalDeliveryFile } from "./updateTotalDelivery";

function Totals(props) {
	const [editMode, setEditMode] = useState(false);

	const [editTotalDelivery, setEditTotalDelivery] = useState(false);
	const [updatedTotalDelivery, setUpdatedTotalDelivery] = useState(
		props.orderInfo.total_delivery_cost
	);

	function startTotalDeliveryEditing(e) {
		updateTotalDeliveryFile.startTotalDeliveryEditing(
			e,
			setEditTotalDelivery,
			setUpdatedTotalDelivery,
			props.allOrderIndex,
			props.orderInfo
		);
	}

	function validateUpdatedTotalDelivery(e) {
		updateTotalDeliveryFile.validateUpdatedTotalDelivery(
			e,
			setUpdatedTotalDelivery
		);
	}

	function updateTotalDelivery(e) {
		updateTotalDeliveryFile.updateTotalDelivery(
			e,
			props.orderInfo,
			endTotalDeliveryEditing,
			istanbul,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater,
			props.setOrderDetails,
			updatedTotalDelivery
		);
	}

	function endTotalDeliveryEditing() {
		updateTotalDeliveryFile.endTotalDeliveryEditing(
			setEditMode,
			setEditTotalDelivery,
			props.allOrderIndex
		);
	}

	return (
		<div className="totals-wrapper">
			<div className="totals">
				<h5>
					Total Revenue:{" "}
					<span className="total-revenue">
						{props.orderInfo.total_revenue.toFixed(2)}$
					</span>
				</h5>
				<h5>
					Total Costs:{" "}
					<span className="total-cost">
						{props.orderInfo.total_costs.toFixed(2)}$
					</span>
				</h5>
				<h6>
					Total Item:{" "}
					<span>{props.orderInfo.total_item_cost.toFixed(2)}$</span>
				</h6>
				<TotalDelivery
					editMode={editMode}
					orderInfo={props.orderInfo}
					allOrderIndex={props.allOrderIndex}
					editTotalDelivery={editTotalDelivery}
					updatedTotalDelivery={updatedTotalDelivery}
					startTotalDeliveryEditing={startTotalDeliveryEditing}
					validateUpdatedTotalDelivery={validateUpdatedTotalDelivery}
					updateTotalDelivery={updateTotalDelivery}
				/>
				<h6>
					Total Airway:{" "}
					<span>{props.orderInfo.total_airway_cost.toFixed(2)}$</span>
				</h6>
				<h5>
					Total Profit:{" "}
					<span className="total-profit">
						{props.orderInfo.total_profit.toFixed(2)}$
					</span>
				</h5>
			</div>
			{editMode ? (
				<p
					className="toggle-edit-text done-edit-text"
					onClick={endTotalDeliveryEditing}
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

export { Totals };
