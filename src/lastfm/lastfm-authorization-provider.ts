import { getAuthRedirectUrl } from "@utils/authentication";
import { CredentialStorage } from "@utils/credential-storage";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmSession } from "@lastfm/lastfm-objects";
import { lastFmFetch } from "@lastfm/lastfm-fetch";

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
    private readonly _credentialStorage: CredentialStorage;

    public constructor(
        requestsEnvironment: LastFmRequestsEnvironment,
        credentialStorage: CredentialStorage
    ) {
        this._requestsEnvironment = requestsEnvironment;
        this._credentialStorage = credentialStorage;
    }

    /**
     * @throws
     */
    public async signIn(): Promise<void> {
        const tokenResponse = await this._getToken();

        if (tokenResponse.error !== undefined) {
            throw new Error(tokenResponse.error);
        }

        const sessionResponse = await this._getSession(tokenResponse.token);

        this._credentialStorage.save(sessionResponse.session);
    }

    private async _getToken(): Promise<TokenResponse> {
        const authRedirectUrl = new URL(getAuthRedirectUrl());

        const lastFmAuthUrl = this._requestsEnvironment.auth(
            authRedirectUrl.href
        );

        authRedirectUrl.searchParams.append(
            LastFmAuthenticationHandlingParams.LastFmAuthUrl,
            lastFmAuthUrl.url.href
        );

        window.open(authRedirectUrl.href, "_blank");

        return await this._waitForToken();
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

    private _getSession(token: string): Promise<LastFmSession> {
        const requestMetaInfo = this._requestsEnvironment.getSession(token);

        return lastFmFetch(requestMetaInfo);
    }
}
