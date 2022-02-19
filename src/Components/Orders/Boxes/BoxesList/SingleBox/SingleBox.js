import "./SingleBox.scss";

function SingleBox() {
    return (
        <div className="box">
            <h5>
                Box #: <span>B01</span>
            </h5>
            <h5 className="number-of-orders">
                Number Of Orders: <span>8</span>
            </h5>
            <h5 className="kilogram">
                Kilograms: <span>8kg</span>
            </h5>
            <div className="airway-cost">
                <h5>
                    Airway Cost: <span>100$</span>
                </h5>
                <h5>06.02.2022</h5>
            </div>
            <div
                className="order-indicator"
                style={{ backgroundColor: "orange" }}
            ></div>
        </div>
    );
}

export { SingleBox };
