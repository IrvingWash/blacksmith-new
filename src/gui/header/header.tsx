import React from "react";
import { useObservable } from "@ui-kit/hooks/use-observable";
import { ActionButton } from "@ui-kit/components/action-button/action-button";
import { HeaderViewModel } from "@gui/header/header-view-model";
import s from "./header.module.css";

interface HeaderProps {
    model: HeaderViewModel;
}

export function Header(props: HeaderProps): React.JSX.Element {
    const model = props.model;
    const username = useObservable(model.username$);

    return (
        <header className={s.container}>
            <div className={s.logo}>blacksmith</div>
            <div className={s.userBlock}>
                {username === null ? (
                    <ActionButton onClick={handleSignInClick}>
                        sign in
                    </ActionButton>
                ) : (
                    <>
                        <a
                            className={s.userLink}
                            href={`https://www.last.fm/user/${username}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {username}
                        </a>
                        <ActionButton onClick={handleSignOutClick}>
                            sign out
                        </ActionButton>
                    </>
                )}
            </div>
        </header>
    );

    async function handleSignInClick(): Promise<void> {
        await model.signIn();
    }

    function handleSignOutClick(): void {
        model.signOut();
    }
}
