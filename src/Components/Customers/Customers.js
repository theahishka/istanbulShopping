import "./Customers.scss";
import { useEffect } from "react";

function Customers() {
    useEffect(() => {
        // Removes active-menu-link class from all links on the menu and then adds it to customers link
        const menuLinks = document.querySelectorAll(".menu-link");
        menuLinks.forEach((element) => {
            if (element.classList.contains("active-menu-link")) {
                element.classList.remove("active-menu-link");
            }
        });
        const customersLink = document.querySelector(".customers-link");
        customersLink.classList.add("active-menu-link");
    }, []);

    return <section>Customers</section>;
}

export { Customers };