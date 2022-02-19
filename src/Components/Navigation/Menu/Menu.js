import "./Menu.scss";

import { Link } from "react-router-dom";

function Menu(props) {
    return (
        <div className="menu">
            <ul>
                <li><Link className="menu-link home-link" onClick={props.closeMenu} to={"/"}>Home</Link></li>
                <hr/>
                <li><Link className="menu-link orders-link" onClick={props.closeMenu} to={"/orders/all"} >Orders</Link></li>
                <hr/>
                <li><Link className="menu-link customers-link" onClick={props.closeMenu} to={"/customers"}>Customers</Link></li>
                <hr/>
                <li><Link className="menu-link driver-link" onClick={props.closeMenu} to={"/driver"}>Driver</Link></li>
            </ul>
            <div className="mobile-sign-out">
                <p>Sign Out</p>
                <i className="fas fa-sign-out-alt"></i>
            </div>
        </div>
    );
}

export { Menu };
