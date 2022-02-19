import "./Navigation.scss";
import logo from "./small-logo.jpg";

import { Link } from "react-router-dom";

import { Menu } from "./Menu/Menu";

let menuOpened = false;

function Navigation(props) {
    const toggleMenu = () => {
        const menu = document.querySelector(".menu");
        menu.classList.toggle("opened-menu");

        const lineOne = document.querySelector(".line1");
        const lineTwo = document.querySelector(".line2");

        if (!menuOpened) {
            lineOne.style.animation = "openBurger1 0.6s ease 0s forwards";
            lineTwo.style.animation = "openBurger2 0.6s ease 0s forwards";
            menuOpened = true;
        } else {
            lineOne.style.animation = "closeBurger1 0.6s ease 0s forwards";
            lineTwo.style.animation = "closeBurger2 0.6s ease 0s forwards";
            menuOpened = false;
        }
    };

    const closeMenu = () => {
        if (window.innerWidth < 730) {
            toggleMenu();
        }
    };

    return (
        <nav>
            <div className="burger" onClick={toggleMenu}>
                <div className="line line1"></div>
                <div className="line line2"></div>
            </div>
            <div className="logo">
                <Link to="/"><img src={logo} alt="Istanbul Shopping Logo" /></Link>
            </div>
            <Menu closeMenu={closeMenu} forMenu={props.forMenu} setForMenu={props.setForMenu} />
            <div className="pc-sign-out">
                <p>Sign Out</p>
                <i className="fas fa-sign-out-alt"></i>
            </div>
        </nav>
    );
}

export { Navigation };
