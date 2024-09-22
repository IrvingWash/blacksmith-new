import React from "react";
import classNames from "classnames";

import s from "./section-title.module.css";

interface SectionTitleProps {
    title: string;
    className?: string;
}

export function SectionTitle(props: SectionTitleProps): React.JSX.Element {
    const { title, className } = props;

    return <h2 className={classNames(s.container, className)}>{title}</h2>;
}
