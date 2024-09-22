import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import classNames from "classnames";

import s from "./form-input.module.css";

interface FormInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    stretch?: boolean;
}

export function FormInput(props: FormInputProps): React.JSX.Element {
    const { className, stretch = false } = props;

    return (
        <input
            {...props}
            className={classNames(
                s.container,
                className,
                stretch ? s.stretch : null
            )}
        />
    );
}
