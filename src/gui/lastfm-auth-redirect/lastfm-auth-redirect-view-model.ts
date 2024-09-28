import { Observable } from "@utils/observable";
import { LastFmAuthenticationHandlingParams } from "@lastfm/lastfm-authorization-provider";

export class LastFmAuthRedirectViewModel {
    public isOutgoing$: Observable<boolean>;

    private _lastFmAuthUrl: string | null = null;

    public constructor() {
        this.isOutgoing$ = new Observable(false);
    }

    public handleRedirect(): void {
        const currentUrl = new URL(window.location.href);

        this._lastFmAuthUrl = currentUrl.searchParams.get(
            LastFmAuthenticationHandlingParams.LastFmAuthUrl
        );

        if (this._lastFmAuthUrl !== null) {
            this._handleOutgoing();
        } else {
            this._handleIncoming(currentUrl);
            window.close();
        }
    }

    public redirectToLastfm(): void {
        if (this._lastFmAuthUrl !== null) {
            window.open(this._lastFmAuthUrl);
            window.close();
        }
    }

    private _handleOutgoing(): void {
        this.isOutgoing$.setValue(true);
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
