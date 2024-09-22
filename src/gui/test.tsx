import React, { useEffect, useState } from "react";
import { LastFmAuthRedirectViewModel } from "@gui/last-fm-auth-redirect/last-fm-auth-redirect-view-model";
import { LastFmAuthRedirect } from "@gui/last-fm-auth-redirect/last-fm-auth-redirect";
import { LastFm } from "@lastfm/lastfm";

const orvm = new LastFmAuthRedirectViewModel();
const lastFm = new LastFm();

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
        await lastFm.signIn();
    }
}
