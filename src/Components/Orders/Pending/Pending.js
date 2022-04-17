import "./Pending.scss";
import { useEffect, useState } from "react";
import { istanbul } from "../../../utils/istanbul";
import { AllOrder } from "./AllOrder/AllOrder";
import { LoadingSpinner } from "../../utils/LoadingSpinner";


function Pending(props) {
	useEffect(() => {
		const tabs = document.querySelectorAll(".tab");
		tabs.forEach((element) => {
			if (element.classList.contains("tab-active")) {
				element.classList.remove("tab-active");
			}
		});
		const pendingTab = document.querySelector(".pending-tab");
		pendingTab.classList.add("tab-active");
	}, []);

	const [all, setAll] = useState(null);
	useEffect(() => {
		istanbul.getAllOrders().then((response) => {
			return setAll(response);
		});
	}, [props.orderOutletUpdater]);

	if (!all) {
		return (
			<section className="spinner-wrapper">
				<LoadingSpinner />
			</section>
		);
	}

	return (
		<section className="pending-wrapper">
			<div className="pending-info">
				<h4 className="pending-total">
					Total:<span> 5</span>
				</h4>
				<h4 className="pending-awaiting-payment">
					Awaiting Payment:<span> 2</span>
				</h4>
				<h4 className="pending-awaiting-delivery">
					Awaiting Delivery:<span> 4</span>
				</h4>
			</div>
			<div className="all-orders">
				{all.pendingOrders.length > 0
					? all.pendingOrders.map((order, index) => {
							return (
								<AllOrder
									orderInfo={order}
									orderOutletUpdater={
										props.orderOutletUpdater
									}
									setOrderOutletUpdater={
										props.setOrderOutletUpdater
									}
									key={`order${index + 1}`}
									allOrderIndex={index}
								/>
							);
					  })
					: null}
			</div>
		</section>
	);
}

export { Pending };
