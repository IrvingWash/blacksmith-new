import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classNames from "classnames";

import s from "./action-button.module.css";

interface ActionButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {}

export function ActionButton(props: ActionButtonProps): React.JSX.Element {
    const { className, disabled } = props;

    return (
        <button
            {...props}
            className={classNames(
                s.container,
                className,
                disabled ? s.disabled : null
            )}
        />
    );
}
