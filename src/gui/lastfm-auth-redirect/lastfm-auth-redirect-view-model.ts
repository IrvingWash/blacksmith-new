import { LastFmAuthenticationHandlingParams } from "@lastfm/lastfm-authorization-provider";

export class LastFmAuthRedirectViewModel {
    public handleRedirect(): void {
        const currentUrl = new URL(window.location.href);

        const lastFmAuthUrl = currentUrl.searchParams.get(
            LastFmAuthenticationHandlingParams.LastFmAuthUrl
        );

        if (lastFmAuthUrl !== null) {
            this._handleOutgoing(lastFmAuthUrl);
        } else {
            this._handleIncoming(currentUrl);
        }

        window.close();
    }

    private _handleOutgoing(lastFmAuthUrl: string): void {
        window.open(lastFmAuthUrl);
    }

    private _handleIncoming(currentUrl: URL): void {
        const token = currentUrl.searchParams.get("token");

        const bc = new BroadcastChannel(
            LastFmAuthenticationHandlingParams.BroadcastChannelName
        );

        if (token === null) {
            bc.postMessage({ error: "Token not received" });
        } else {
            bc.postMessage({ token });
        }
    }
}
