import "./OrderInfo.scss";

function OrderInfo(props) {
	function formatDate(date) {
		if (date) {
			let splittedDate = date.split("");
			let formattedDate = [];
			for (let i = 0; i < 10; i++) {
				formattedDate.push(splittedDate[i]);
			}
			return formattedDate.join("");
		}
	}

	return (
		<div className="order-information order-section">
			<h4>Order Information</h4>
			<h5>
				Order #: <span>{props.orderInfo.order_id}</span>
			</h5>
			<h5>
				Box #:{" "}
				<span className="box-number">{props.orderInfo.box_id}</span>
			</h5>
			<h5>
				Number of Items: <span>{props.orderInfo.number_of_items}</span>
			</h5>
			<h5>
				Created Date:{" "}
				<span>{formatDate(props.orderInfo.date_created)}</span>
			</h5>
			<h5>
				Delivered Date:{" "}
				<span>
					{!props.orderInfo.date_delivered
						? "Not Delivered"
						: formatDate(props.orderInfo.date_delivered)}
				</span>
			</h5>
			<h5>
				Total Amount: <span>{props.orderInfo.total_amount}$</span>
			</h5>
			{props.paymentsInfo.map((payment, index) => {
				return (
					<h6 key={`payment${index + 1}`}>
						Payment {index + 1}:{" "}
						<span>
							{payment.amount}$ ({formatDate(payment.date)})
						</span>
					</h6>
				);
			})}
			<h5>
				Outstanding:{" "}
				<span className="outstanding">
					{props.orderInfo.outstanding}$
				</span>
			</h5>
		</div>
	);
}

export { OrderInfo };
