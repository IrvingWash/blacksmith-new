import React, { useEffect } from "react";
import { LastFmAuthRedirectViewModel } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect-view-model";

interface LastFmAuthRedirectProps {
    model: LastFmAuthRedirectViewModel;
}

export function LastFmAuthRedirect(
    props: LastFmAuthRedirectProps
): React.JSX.Element {
    const model = props.model;

    useEffect(() => {
        model.handleRedirect();
    }, [model.handleRedirect]);

    return (
        <div>
            <p>blacksmith-last.fm auth redirect</p>
        </div>
    );
}
