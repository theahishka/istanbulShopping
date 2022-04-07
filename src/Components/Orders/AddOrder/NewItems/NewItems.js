import "./NewItems.scss";
import { NewItem } from "./NewItem/NewItem";

function NewItems(props) {
	return (
		<div className="add-new-items">
			<h3>Items</h3>
			{props.items.map((item, index) => {
				return (
					<NewItem
						items={props.items}
						item={item}
						index={index}
						setItems={props.setItems}
						key={`new-item-${index + 1}`}
					/>
				);
			})}
			<div
				className="add-additional-item-button"
				onClick={props.addAdditionalItem}
			>
				Add Item
			</div>
		</div>
	);
}

export { NewItems };
