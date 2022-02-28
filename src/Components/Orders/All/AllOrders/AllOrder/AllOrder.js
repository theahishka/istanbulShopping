import { useState, useEffect } from "react";
import "./AllOrder.scss";
import { Item } from "./Item/Item";
import { istanbul } from "../../../../../utils/istanbul";

function AllOrder(props) {
	useEffect(() => {
		istanbul.getOrders();
	}, []);
	const [detailedBreakdownOpened, setDetailedBreakdownOpened] =
		useState(false);
	const toggleDetailedBreakdown = (e) => {
		if (detailedBreakdownOpened) {
			setDetailedBreakdownOpened(false);

			setTimeout(() => {
				const detailedProfitBreakdownElement = e.target;
				let scrollingAmount =
					-615 +
					detailedProfitBreakdownElement.getBoundingClientRect().top;
				window.scrollBy({
					top: scrollingAmount,
					left: 0,
					behavior: "smooth",
				});
			}, 500);
		} else {
			setDetailedBreakdownOpened(true);

			setTimeout(() => {
				const detailedProfitBreakdownElement =
					e.target.previousElementSibling;
				let scrollingAmount =
					detailedProfitBreakdownElement.getBoundingClientRect().top -
					5;
				window.scrollBy({
					top: scrollingAmount,
					left: 0,
					behavior: "smooth",
				});
			}, 300);
		}
	};

	let numberOfItems = props.order.orderInfo.numberOfItems;
	let numberOfPayments = props.order.orderInfo.payments.length;
	let calculatedMaxHeight =
		431 * numberOfItems + 15 * numberOfItems + 24 * numberOfPayments;
	let fixedMaxHeight = 0;

	// const closeAllOrderDetails = () => {
	//     const allDetailedOrderElements =
	//         document.querySelectorAll(".detailed-order");
	//     allDetailedOrderElements.forEach((element) => {
	//         element.style.opacity = "0";
	//         element.style.transform = "scale(0)";
	//     });

	//     const allOrderOverviewElements =
	//         document.querySelectorAll(".order-overview");
	//     allOrderOverviewElements.forEach((element) => {
	//         element.style.opacity = "1";
	//         element.style.transform = "scale(1)";
	//     });

	//     const allAllOrderElements = document.querySelectorAll(".all-order");
	//     allAllOrderElements.forEach((element) => {
	//         element.style.maxHeight = "93px";
	//     });
	// };

	const closeOrderDetails = (e) => {
		const detailedOrderElement = e.target.parentElement;
		detailedOrderElement.style.opacity = "0";
		detailedOrderElement.style.transform = "scale(0)";

		const orderOverviewElement =
			e.target.parentElement.parentElement.firstElementChild;
		orderOverviewElement.style.opacity = "1";
		orderOverviewElement.style.transform = "scale(1)";

		const allOrderElement = e.target.parentElement.parentElement;
		allOrderElement.style.maxHeight = "93px";

		setDetailedBreakdownOpened(false);
	};

	const openOrderDetails = (e) => {
		const orderOverviewElement = e.target;
		orderOverviewElement.style.opacity = "0";
		orderOverviewElement.style.transform = "scale(0)";

		const detailedOrderElement = e.target.nextElementSibling;
		detailedOrderElement.style.opacity = "1";
		detailedOrderElement.style.transform = "scale(1)";

		const allOrderElement = e.target.parentElement;
		allOrderElement.style.maxHeight = `${calculatedMaxHeight + 608}px`;

		let scrollByAmount = allOrderElement.getBoundingClientRect().top - 5;
		setTimeout(() => {
			window.scrollBy({
				top: scrollByAmount,
				left: 0,
				behavior: "smooth",
			});
		}, 300);
	};

	let delivered = props.order.orderInfo.deliveredDate;
	let outstanding = props.order.orderInfo.outstanding;
	let indicatorColor;
	if (outstanding > 0 || delivered === "Not Delivered") {
		indicatorColor = "orange";
	} else {
		indicatorColor = "green";
	}

	return (
		<div className="all-order">
			<div className="order-overview" onClick={openOrderDetails}>
				<h5 className="order-number">
					Order #: <span>{props.order.orderInfo.orderNumber}</span>
				</h5>
				<h5 className="customer">
					Customer: <span>{props.order.customerInfo.name}</span>
				</h5>
				<h5>
					Amount: <span>{props.order.orderInfo.totalAmount}$</span>
				</h5>
				<p className="date">{props.order.orderInfo.orderedDate}</p>
				<div
					className="order-indicator"
					style={{
						backgroundColor: `${indicatorColor}`,
					}}
				></div>
			</div>
			<div className="detailed-order">
				<div className="order-information order-section">
					<h4>Order Information</h4>
					<h5>
						Order #:{" "}
						<span>{props.order.orderInfo.orderNumber}</span>
					</h5>
					<h5>
						Box #:{" "}
						<span className="box-number">
							{props.order.orderInfo.boxNumber}
						</span>
					</h5>
					<h5>
						Number of Items:{" "}
						<span>{props.order.orderInfo.numberOfItems}</span>
					</h5>
					<h5>
						Ordered Date:{" "}
						<span>{props.order.orderInfo.orderedDate}</span>
					</h5>
					<h5>
						Delivered Date:{" "}
						<span>{props.order.orderInfo.deliveredDate}</span>
					</h5>
					<h5>
						Total Amount:{" "}
						<span>{props.order.orderInfo.totalAmount}$</span>
					</h5>
					{props.order.orderInfo.payments.map((element, index) => {
						return (
							<h6 key={`payment${index + 1}`}>
								Payment {index + 1}:{" "}
								<span>{element.paymentAmount}$</span>
							</h6>
						);
					})}
					<h5>
						Outstanding:{" "}
						<span className="outstanding">
							{props.order.orderInfo.outstanding}$
						</span>
					</h5>
				</div>
				<div className="order-customer order-section">
					<h4>Customer Information</h4>
					<h5>
						Name:{" "}
						<span className="customer-name">
							{props.order.customerInfo.name}
						</span>
					</h5>
					<h5>
						Address: <span>{props.order.customerInfo.address}</span>
					</h5>
					<h5>
						Phone Number:{" "}
						<span>{props.order.customerInfo.phoneNumber}</span>
					</h5>
					<h5>
						Comments:{" "}
						<span>{props.order.customerInfo.comments}</span>
					</h5>
				</div>
				<div className="order-profit-breakdown order-section">
					<h4>Profit Breakdown</h4>
					<div className="totals">
						<h5>
							Total Revenue:{" "}
							<span className="total-revenue">
								{props.order.profitBreakdown.totalRevenue}$
							</span>
						</h5>
						<h5>
							Total Cost:{" "}
							<span className="total-cost">
								{props.order.profitBreakdown.totalCost}$
							</span>
						</h5>
						<h6>
							Total Item: <span>870$</span>
						</h6>
						<h6>
							Total Delivery: <span>10$</span>
						</h6>
						<h6>
							Total Airway: <span>15$</span>
						</h6>
						<h5>
							Total Profit:{" "}
							<span className="total-profit">
								{props.order.profitBreakdown.totalProfit}$
							</span>
						</h5>
					</div>
					<div
						className={`detailed-profit-breakdown`}
						style={{
							maxHeight: `${
								detailedBreakdownOpened
									? calculatedMaxHeight
									: fixedMaxHeight
							}px`,
						}}
					>
						{props.order.items.map((element, index) => {
							return (
								<Item
									item={element}
									number={index + 1}
									key={`item${index}`}
								/>
							);
						})}
					</div>
					<p
						className="show-details"
						onClick={toggleDetailedBreakdown}
					>
						{detailedBreakdownOpened ? "Hide" : "Show"} items
					</p>
				</div>
				<i
					className="far fa-times-circle"
					onClick={closeOrderDetails}
				></i>
			</div>
		</div>
	);
}

export { AllOrder };
