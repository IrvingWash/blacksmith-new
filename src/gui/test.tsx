import React, { useEffect, useState } from "react";
import { CredentialStorage } from "@utils/credential-storage";
import { LastFmAuthRedirectViewModel } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect-view-model";
import { LastFmAuthRedirect } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect";
import { LastFm } from "@lastfm/lastfm";

const cs = new CredentialStorage();
const lastFm = new LastFm(cs);
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
                        onClick={handleSignInClick}
                    >
                        Authenticate
                    </button>
                    <button
                        type="button"
                        onClick={handleRecentTracksClick}
                    >
                        Get recent tracks
                    </button>
                </div>
            )}
        </>
    );

    async function handleSignInClick(): Promise<void> {
        await lastFm.signIn();
    }

    async function handleRecentTracksClick(): Promise<void> {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const x = await lastFm.recentTracks(cs.load()!.name);

        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(x);
    }
}
