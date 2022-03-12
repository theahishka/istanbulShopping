import "./Orders.scss";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { AddOrder } from "./AddOrder/AddOrder";

function Orders(props) {
	useEffect(() => {
		// Removes active-menu-link class from all links on the menu and then adds it to orders link
		const menuLinks = document.querySelectorAll(".menu-link");
		menuLinks.forEach((element) => {
			if (element.classList.contains("active-menu-link")) {
				element.classList.remove("active-menu-link");
			}
		});
		const ordersLink = document.querySelector(".orders-link");
		ordersLink.classList.add("active-menu-link");
	}, []);

	return (
		<section className="orders-wrapper">
			<AddOrder
				orderOutletUpdater={props.orderOutletUpdater}
				setOrderOutletUpdater={props.setOrderOutletUpdater}
			/>
			<div className="orders">
				<div className="tabs">
					<Link to={"/orders/all"} className="tab all-tab">
						All
					</Link>
					<Link to={"/orders/pending"} className="tab pending-tab">
						Pending
					</Link>
					<Link to={"/orders/boxes"} className="tab boxes-tab">
						Boxes
					</Link>
				</div>
				<Outlet />
				<div className="design-extra-1"></div>
			</div>
		</section>
	);
}

export { Orders };
