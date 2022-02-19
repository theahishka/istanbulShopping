import { AllOrder } from "./AllOrder/AllOrder";
import "./AllOrders.scss";

function AllOrders(props) {
    return (
        <div className="all-orders">
            {props.ordersInfo.orders.map((element) => {
                return <AllOrder order={element} key={`${element.orderInfo.orderNumber}`} />;
            })}
        </div>
    );
}

export { AllOrders };
