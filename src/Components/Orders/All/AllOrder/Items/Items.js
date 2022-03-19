import "./Items.scss";
import { Item } from "./Item/Item";
import { useState } from "react";

function Items(props) {
	const [editMode, setEditMode] = useState(false);

	return (
		<div
			className={`detailed-profit-breakdown`}
			style={{
				maxHeight: `${
					props.detailedProfitBreakdownOpened
						? props.calculatedMaxHeight
						: 0
				}px`,
			}}
		>
			<h4>Items</h4>
			{props.itemsInfo.map((item, index) => {
				return (
					<Item item={item} number={index + 1} key={`item${index}`} />
				);
			})}
			{editMode ? (
				<p
					className="toggle-edit-text done-edit-text"
					onClick={() => setEditMode(false)}
				>
					done
				</p>
			) : (
				<p
					className="toggle-edit-text"
					onClick={() => setEditMode(true)}
				>
					edit
				</p>
			)}
		</div>
	);
}

export { Items };
