import "./PendingOrder.scss";
import { useState } from "react";
import { Item } from "./Item/Item";

function PendingOrder(props) {
    const [detailedBreakdownOpened, setDetailedBreakdownOpened] =
        useState(false);
    const toggleDetailedBreakdown = () => {
        if (detailedBreakdownOpened) {
            setDetailedBreakdownOpened(false);
        } else {
            setDetailedBreakdownOpened(true);
        }
    };

    let numberOfItems = props.order.orderInfo.numberOfItems;
    let calculatedMaxHeight = 431 * numberOfItems + 15 * numberOfItems;
    let fixedMaxHeight = 0;

    const closeOrderDetails = (e) => {
        const detailedOrderElement = e.target.parentElement;
        detailedOrderElement.style.opacity = "0";
        detailedOrderElement.style.transform = "scale(0)";

        const orderOverviewElement =
            e.target.parentElement.parentElement.firstElementChild;
        orderOverviewElement.style.opacity = "1";
        orderOverviewElement.style.transform = "scale(1)";

        const allOrderElement = e.target.parentElement.parentElement;
        allOrderElement.style.maxHeight = "150px";

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
        allOrderElement.style.maxHeight = `${calculatedMaxHeight + 536}px`;
    };

    let delivered = props.order.orderInfo.deliveredDate !== "Not Delivered";
    let outstanding = props.order.orderInfo.outstanding !== 0;

    return (
        <div className="pending-order">
            <div className="order-overview" onClick={openOrderDetails}>
                <h5 className="order-number">
                    Order #: <span>{props.order.orderInfo.orderNumber}</span>
                </h5>
                <h5 className="customer">
                    Customer: <span>{props.order.customerInfo.name}</span>
                </h5>
                <h5 className="customer">
                    Delivered Date:{" "}
                    <span>{props.order.orderInfo.deliveredDate}</span>
                </h5>
                <h5 className="outstanding">
                    Outstanding:{" "}
                    <span>{props.order.orderInfo.outstanding}$</span>
                </h5>
                <h5>
                    Amount: <span>{props.order.orderInfo.totalAmount}$</span>
                </h5>
                <p className="date">{props.order.orderInfo.orderedDate}</p>
                <div className="order-indicator">
                    <i
                        className="fa-solid fa-dollar-sign"
                        style={{ display: `${outstanding ? "block" : "none"}` }}
                    ></i>
                    <i
                        className="fa-solid fa-truck"
                        style={{ display: `${delivered ? "none" : "block"}` }}
                    ></i>
                </div>
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
                        Outstanding:{" "}
                        <span className="outstanding">
                            {props.order.orderInfo.outstanding}$
                        </span>
                    </h5>
                    <h5>
                        Total Amount:{" "}
                        <span>{props.order.orderInfo.totalAmount}$</span>
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
                            return <Item item={element} key={`item${index}`} />;
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

export { PendingOrder };
