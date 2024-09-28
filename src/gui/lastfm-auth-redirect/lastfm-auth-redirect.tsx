import React, { useEffect } from "react";
import { useObservable } from "@ui-kit/hooks/use-observable";
import { ActionButton } from "@ui-kit/components/action-button/action-button";
import { LastFmAuthRedirectViewModel } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect-view-model";
import s from "./lastfm-auth-redirect.module.css";

interface LastFmAuthRedirectProps {
    model: LastFmAuthRedirectViewModel;
}

export function LastFmAuthRedirect(
    props: LastFmAuthRedirectProps
): React.JSX.Element {
    const model = props.model;
    const isOutgoing = useObservable(model.isOutgoing$);

    useEffect(() => {
        model.handleRedirect();
    }, [model.handleRedirect]);

    return (
        <div className={s.container}>
            {/* biome-ignore lint/nursery/useConsistentCurlyBraces: <explanation> */}
            <p>{"blacksmith <-> last.fm auth redirect"}</p>
            {isOutgoing && (
                <ActionButton onClick={() => model.redirectToLastfm()}>
                    go to lastfm to authenticate
                </ActionButton>
            )}
        </div>
    );
}
