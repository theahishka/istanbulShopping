import "./BoxesList.scss";

import { SingleBox } from "./SingleBox/SingleBox";

function BoxesList() {
    return (
        <div className="boxes">
            <SingleBox />
            <SingleBox />
            <SingleBox />
        </div>
    );
}

export { BoxesList };
