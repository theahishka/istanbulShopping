import "./Pending.scss";
import { useEffect } from "react";
import { PendingOrders } from "./PendingOrders/PendingOrders";

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
            <PendingOrders ordersInfo={props.ordersInfo} />
        </section>
    );
}

export { Pending };
