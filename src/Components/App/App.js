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

const ordersInfo = {
    totalOrders: 100,
    completedOrders: 90,
    pendingOrders: 10,
    ReturnedOrders: 0,
    totalBoxes: 10,
    orders: [
        {
            orderInfo: {
                orderNumber: 1005,
                boxNumber: "B01",
                numberOfItems: 1,
                orderedDate: "05.02.2022",
                deliveredDate: "06.02.2022",
                totalAmount: 680,
                payments: [
                    {
                        paymentAmount: 680,
                    },
                ],
                outstanding: 0,
            },
            customerInfo: {
                name: "Aida",
                address: "Kara Suu Chaihana",
                phoneNumber: "+996222419449",
                comments: "very good customer",
            },
            profitBreakdown: {
                totalRevenue: 680,
                totalCost: 630,
                totalProfit: 50,
            },
            items: [
                {
                    itemNumber: 1,
                    brand: "Dyson",
                    name: "Complete Air Wrapper Long",
                    type: "Fan",
                    color: "Purple",
                    size: "Standard",
                    revenue: 680,
                    costs: 630,
                    itemCost: 620,
                    deliveryCost: 5,
                    airwayCost: 5,
                    profit: 50,
                },
            ],
        },
        {
            orderInfo: {
                orderNumber: 1004,
                boxNumber: "B01",
                numberOfItems: 2,
                orderedDate: "05.02.2022",
                deliveredDate: "Not Delivered",
                totalAmount: 1100,
                payments: [
                    {
                        paymentAmount: 800,
                    },
                ],
                outstanding: 300,
            },
            customerInfo: {
                name: "Gulnara",
                address: "Avangard Business Center, office 604",
                phoneNumber: "+996222419449",
                comments: "very good customer",
            },
            profitBreakdown: {
                totalRevenue: 1100,
                totalCost: 895,
                totalProfit: 205,
            },
            items: [
                {
                    itemNumber: 1,
                    brand: "LV",
                    name: "Louxembrourg Sneakers",
                    color: "Black",
                    type: "shoes",
                    size: 38,
                    revenue: 1000,
                    costs: 815,
                    itemCost: 800,
                    deliveryCost: 5,
                    airwayCost: 10,
                    profit: 185,
                },
                {
                    itemNumber: 2,
                    brand: "Gucci",
                    name: "Paris Print T-Shirt",
                    type: "T-Shirt",
                    color: "White",
                    size: "S",
                    revenue: 100,
                    costs: 80,
                    itemCost: 70,
                    deliveryCost: 5,
                    airwayCost: 5,
                    profit: 20,
                },
            ],
        },
        {
            orderInfo: {
                orderNumber: 1003,
                boxNumber: "B01",
                numberOfItems: 2,
                orderedDate: "05.02.2022",
                deliveredDate: "Not Delivered",
                totalAmount: 1100,
                payments: [
                    {
                        paymentAmount: 800,
                    },
                ],
                outstanding: 300,
            },
            customerInfo: {
                name: "Gulnara",
                address: "Avangard Business Center, office 604",
                phoneNumber: "+996222419449",
                comments: "very good customer",
            },
            profitBreakdown: {
                totalRevenue: 1100,
                totalCost: 895,
                totalProfit: 205,
            },
            items: [
                {
                    itemNumber: 1,
                    brand: "LV",
                    name: "Louxembrourg Sneakers",
                    color: "Black",
                    type: "shoes",
                    size: 38,
                    revenue: 1000,
                    costs: 815,
                    itemCost: 800,
                    deliveryCost: 5,
                    airwayCost: 10,
                    profit: 185,
                },
                {
                    itemNumber: 2,
                    brand: "Gucci",
                    name: "Paris Print T-Shirt",
                    type: "T-Shirt",
                    color: "White",
                    size: "S",
                    revenue: 100,
                    costs: 80,
                    itemCost: 70,
                    deliveryCost: 5,
                    airwayCost: 5,
                    profit: 20,
                },
            ],
        },
        {
            orderInfo: {
                orderNumber: 1002,
                boxNumber: "B01",
                numberOfItems: 2,
                orderedDate: "05.02.2022",
                deliveredDate: "Not Delivered",
                totalAmount: 1100,
                payments: [
                    {
                        paymentAmount: 800,
                    },
                ],
                outstanding: 300,
            },
            customerInfo: {
                name: "Gulnara",
                address: "Avangard Business Center, office 604",
                phoneNumber: "+996222419449",
                comments: "very good customer",
            },
            profitBreakdown: {
                totalRevenue: 1100,
                totalCost: 895,
                totalProfit: 205,
            },
            items: [
                {
                    itemNumber: 1,
                    brand: "LV",
                    name: "Louxembrourg Sneakers",
                    color: "Black",
                    type: "shoes",
                    size: 38,
                    revenue: 1000,
                    costs: 815,
                    itemCost: 800,
                    deliveryCost: 5,
                    airwayCost: 10,
                    profit: 185,
                },
                {
                    itemNumber: 2,
                    brand: "Gucci",
                    name: "Paris Print T-Shirt",
                    type: "T-Shirt",
                    color: "White",
                    size: "S",
                    revenue: 100,
                    costs: 80,
                    itemCost: 70,
                    deliveryCost: 5,
                    airwayCost: 5,
                    profit: 20,
                },
            ],
        },
        {
            orderInfo: {
                orderNumber: 1001,
                boxNumber: "B01",
                numberOfItems: 1,
                orderedDate: "05.02.2022",
                deliveredDate: "06.02.2022",
                totalAmount: 680,
                payments: [
                    {
                        paymentAmount: 680,
                    },
                ],
                outstanding: 0,
            },
            customerInfo: {
                name: "Aida",
                address: "Kara Suu Chaihana",
                phoneNumber: "+996222419449",
                comments: "very good customer",
            },
            profitBreakdown: {
                totalRevenue: 680,
                totalCost: 630,
                totalProfit: 50,
            },
            items: [
                {
                    itemNumber: 1,
                    brand: "Dyson",
                    name: "Complete Air Wrapper Long",
                    type: "Fan",
                    color: "Purple",
                    size: "Standard",
                    revenue: 680,
                    costs: 630,
                    itemCost: 620,
                    deliveryCost: 5,
                    airwayCost: 5,
                    profit: 50,
                },
            ],
        },
    ],
};

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/orders/"
                        element={<Orders ordersInfo={ordersInfo} />}
                    >
                        <Route
                            path="all"
                            element={<All ordersInfo={ordersInfo} />}
                        />
                        <Route
                            path="pending"
                            element={<Pending ordersInfo={ordersInfo} />}
                        />
                        <Route path="boxes" element={<Boxes />} />
                    </Route>
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/driver" element={<Driver />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
