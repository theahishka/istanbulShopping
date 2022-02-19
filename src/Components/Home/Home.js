import "./Home.scss";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        // Removes active-menu-link class from all links on the menu and then adds it to home link
        const menuLinks = document.querySelectorAll(".menu-link");
        menuLinks.forEach((element) => {
            if (element.classList.contains("active-menu-link")) {
                element.classList.remove("active-menu-link");
            }
        });
        const homeLink = document.querySelector(".home-link");
        homeLink.classList.add("active-menu-link");
    }, []);
    return <main>Home</main>;
}

export { Home };
