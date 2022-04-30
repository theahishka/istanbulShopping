import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import { Home } from "../Home/Home";
import { Orders } from "../Orders/Orders";
import { Customers } from "../Customers/Customers";
import { Driver } from "../Driver/Driver";
import { Navigation } from "../Navigation/Navigation";
import { All } from "../Orders/All/All";
import { Pending } from "../Orders/Pending/Pending";
import { Boxes } from "../Orders/Boxes/Boxes";
import { useState } from "react";
import { LoadingScreen } from "../utils/LoadingScreen/LoadingScreen";

function App() {
	const [orderOutletUpdater, setOrderOutletUpdater] = useState(false);
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/orders/"
						element={
							<Orders
								orderOutletUpdater={orderOutletUpdater}
								setOrderOutletUpdater={setOrderOutletUpdater}
							/>
						}
					>
						<Route
							path="all"
							element={
								<All
									orderOutletUpdater={orderOutletUpdater}
									setOrderOutletUpdater={
										setOrderOutletUpdater
									}
								/>
							}
						/>
						<Route
							path="pending"
							element={
								<Pending
									orderOutletUpdater={orderOutletUpdater}
									setOrderOutletUpdater={
										setOrderOutletUpdater
									}
								/>
							}
						/>
						<Route
							path="boxes"
							element={
								<Boxes
									orderOutletUpdater={orderOutletUpdater}
									setOrderOutletUpdater={
										setOrderOutletUpdater
									}
								/>
							}
						/>
					</Route>
					<Route path="/customers" element={<Customers />} />
					<Route path="/driver" element={<Driver />} />
				</Routes>
				<LoadingScreen/>
			</div>
		</Router>
	);
}

export default App;
