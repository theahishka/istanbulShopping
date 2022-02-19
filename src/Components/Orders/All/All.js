import { useEffect } from "react";
import "./All.scss";

import { AllOrders } from "./AllOrders/AllOrders";

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

    return (
        <section className="all-wrapper">
            <div className="all-info">
                <h4 className="all-total">
                    Total:<span> 100</span>
                </h4>
                <h4 className="all-completed">
                    Completed:<span> 94</span>
                </h4>
                <h4 className="all-pending">
                    Pending:<span> 5</span>
                </h4>
                <h4 className="all-returned">
                    Returned:<span> 1</span>
                </h4>
                <h4 className="all-boxes">
                    Boxes:<span> 10</span>
                </h4>
            </div>
            <AllOrders ordersInfo={props.ordersInfo} />
        </section>
    );
}

export { All };
