import { getAuthRedirectUrl } from "@utils/authentication";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmGetSessionResponse } from "@lastfm/lastfm-objects";

interface SuccessTokenResponse {
    token: string;
    error: never;
}

interface ErrorTokenResponse {
    token: never;
    error: string;
}

type TokenResponse = SuccessTokenResponse | ErrorTokenResponse;

export const enum LastFmAuthenticationHandlingParams {
    LastFmAuthUrl = "lastfm-auth-url",
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

    /**
     * @throws
     */
    public async signIn(): Promise<void> {
        const tokenResponse = await this._getToken();

        if (tokenResponse.error !== undefined) {
            throw new Error(tokenResponse.error);
        }

        const session = await this._getSession(tokenResponse.token);

        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(session);
    }

    private async _getToken(): Promise<TokenResponse> {
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

        return await this._waitForToken();
    }

    private async _getSession(
        token: string
    ): Promise<LastFmGetSessionResponse> {
        const requestMetaInfo = this._requestsEnvironment.getSession(
            this._apiKey,
            token
        );

        const response = await fetch(requestMetaInfo.url);

        return response.json();
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
