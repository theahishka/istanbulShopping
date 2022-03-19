import { useEffect, useState } from "react";
import "./All.scss";

import { AllOrder } from "./AllOrder/AllOrder";
import { istanbul } from "../../../utils/istanbul";
import { LoadingSpinner } from "../../utils/LoadingSpinner";

function All(props) {
	useEffect(() => {
		const tabs = document.querySelectorAll(".tab");
		tabs.forEach((element) => {
			if (element.classList.contains("tab-active")) {
				element.classList.remove("tab-active");
			}
		});
		const allTab = document.querySelector(".all-tab");
		allTab.classList.add("tab-active");
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
		<section className="all-wrapper">
			<div className="all-info">
				<h4 className="all-total">
					Total:<span> {all.total}</span>
				</h4>
				<h4 className="all-completed">
					Completed:<span> {all.completed}</span>
				</h4>
				<h4 className="all-pending">
					Pending:<span> {all.pending}</span>
				</h4>
				<h4 className="all-boxes">
					Boxes:<span> {all.boxes}</span>
				</h4>
			</div>
			<div className="all-orders">
				{all.orders.map((order, index) => {
					return (
						<AllOrder
							orderInfo={order}
							orderOutletUpdater={props.orderOutletUpdater}
							setOrderOutletUpdater={props.setOrderOutletUpdater}
							key={`order${index + 1}`}
							allOrderIndex={index}
						/>
					);
				})}
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
				<AllOrder orderInfo={all.orders[0]} />
			</div>
		</section>
	);
}

export { All };
