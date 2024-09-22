import { getAuthRedirectUrl } from "@utils/authentication";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";

interface TokenResponse {
    token?: string;
    error?: string;
}

export const enum LastFmAuthenticationHandlingParams {
    LastFmAuthUrl = "last-fm-auth-url",
    BroadcastChannelName = "blacksmith-lastfm-auth",
}

export class LastFmAuthorizationProvider {
    private readonly _requestsEnvironment: LastFmRequestsEnvironment;
    private readonly _apiKey: string;

    public constructor(
        requestsEnvironment: LastFmRequestsEnvironment,
        apiKey: string
    ) {
        this._requestsEnvironment = requestsEnvironment;
        this._apiKey = apiKey;
    }

    public async signIn(): Promise<void> {
        const authRedirectUrl = new URL(getAuthRedirectUrl());

        const lastFmAuthUrl = this._requestsEnvironment.auth(
            this._apiKey,
            authRedirectUrl.href
        );

        authRedirectUrl.searchParams.append(
            LastFmAuthenticationHandlingParams.LastFmAuthUrl,
            lastFmAuthUrl.url.href
        );

        window.open(authRedirectUrl.href, "_blank");

        const tokenResponse = await this._waitForToken();

        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(tokenResponse);
    }

    private _waitForToken(): Promise<TokenResponse> {
        const bc = new BroadcastChannel(
            LastFmAuthenticationHandlingParams.BroadcastChannelName
        );

        return new Promise((resolve) => {
            bc.onmessage = (event: MessageEvent<TokenResponse>) => {
                resolve(event.data);
            };
        });
    }
}
