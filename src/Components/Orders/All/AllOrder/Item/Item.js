import "./Item.scss";

function Item(props) {
    return (
        <div className="item">
            <h4>Item {props.number}</h4>
            <h5>
                Brand: <span>{props.item.brand}</span>
            </h5>
            <h5>
                Name: <span>{props.item.name}</span>
            </h5>
            <h5>
                Color: <span>{props.item.color}</span>
            </h5>
            <h5>
                Type: <span>{props.item.type}</span>
            </h5>
            <h5>
                Size: <span>{props.item.size}</span>
            </h5>
            <div className="revenue item-finance">
                <h4 style={{marginBottom: "0"}}>Revenue: <span>{props.item.revenue}$</span></h4>
            </div>
            <div className="costs item-finance">
                <h4>Costs: <span>{props.item.item_costs}$</span></h4>
                <h5>
                    Item: <span>{props.item.item_cost}$</span>
                </h5>
                <h5>
                    Delivery: <span>{props.item.item_delivery_cost}$</span>
                </h5>
                <h5>
                    Airway: <span>{props.item.item_airway_cost}$</span>
                </h5>
            </div>
            <div className="profit item-finance">
                <h4 style={{marginBottom: "0"}}>Profit <span>{props.item.profit}$</span></h4>
            </div>
        </div>
    );
}

export { Item };
