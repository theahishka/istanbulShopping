import "./Boxes.scss";
import { useEffect } from "react";
import { BoxesList } from "./BoxesList/BoxesList";

function Boxes() {
    useEffect(() => {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((element) => {
            if (element.classList.contains("tab-active")) {
                element.classList.remove("tab-active");
            }
        });
        const boxesTab = document.querySelector(".boxes-tab");
        boxesTab.classList.add("tab-active");
    }, []);
    return (
        <section className="boxes-wrapper">
            <div className="boxes-info">
                <h4 className="boxes-total">
                    Total:<span> 10</span>
                </h4>
                <h4 className="boxes-not-paid">
                    Pending Boxes:<span> 1</span>
                </h4>
            </div>
            <BoxesList/>
        </section>
    );
}

export { Boxes };
