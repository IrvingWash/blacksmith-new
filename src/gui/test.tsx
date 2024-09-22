import React, { useEffect, useState } from "react";
import { LastFmAuthorizationProvider } from "@lastfm/lastfm-authorization-provider";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmAuthRedirectViewModel } from "@gui/last-fm-auth-redirect/last-fm-auth-redirect-view-model";
import { LastFmAuthRedirect } from "@gui/last-fm-auth-redirect/last-fm-auth-redirect";

const orvm = new LastFmAuthRedirectViewModel();

export function Test(): React.JSX.Element {
    const [page, setPage] = useState<string>("main");

    useEffect(() => {
        const currentUrl = new URL(window.location.href);

        if (currentUrl.pathname.includes("auth-redirect")) {
            setPage("redirect");
        }
    }, []);

    return (
        <>
            {page === "redirect" ? (
                <LastFmAuthRedirect model={orvm} />
            ) : (
                <div>
                    <button
                        type="button"
                        onClick={handleClick}
                    >
                        Authenticate
                    </button>
                </div>
            )}
        </>
    );

    async function handleClick(): Promise<void> {
        const re = new LastFmRequestsEnvironment();
        const ap = new LastFmAuthorizationProvider(re);

        await ap.signIn();
    }
}
