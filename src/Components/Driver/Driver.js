import "./Driver.scss";
import { useEffect } from "react";

function Driver() {
    useEffect(() => {
        // Removes active-menu-link class from all links on the menu and then adds it to driver link
        const menuLinks = document.querySelectorAll(".menu-link");
        menuLinks.forEach((element) => {
            if (element.classList.contains("active-menu-link")) {
                element.classList.remove("active-menu-link");
            }
        });
        const driverLink = document.querySelector(".driver-link");
        driverLink.classList.add("active-menu-link");
    }, []);
    return <section>Driver</section>;
}

export { Driver };
