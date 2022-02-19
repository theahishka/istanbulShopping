import "./PendingOrders.scss";

import { PendingOrder } from "./PendingOrder/PendingOrder";

function PendingOrders(props) {
    return (
        <div className="pending-orders">
            {props.ordersInfo.orders.map((element) => {
                if (
                    element.orderInfo.outstanding > 0 ||
                    element.orderInfo.deliveredDate === "Not Delivered"
                ) {
                    return (
                        <PendingOrder
                            order={element}
                            key={`pending${element.orderInfo.orderNumber}`}
                        />
                    );
                }
            })}
        </div>
    );
}

export { PendingOrders };
