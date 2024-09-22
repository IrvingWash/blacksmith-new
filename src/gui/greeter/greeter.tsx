import React from "react";

import s from "./greeter.module.css";

export function Greeter(): React.JSX.Element {
    return (
        <div className={s.container}>
            to start using <span className={s.title}>blacksmith</span> please
            authenticate your <span className={s.redText}>last.fm</span> profile
        </div>
    );
}
