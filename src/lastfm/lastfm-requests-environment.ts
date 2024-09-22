import { CredentialStorage } from "@utils/credential-storage";
import { HttpMethod } from "@utils/http/http-method";
import { addQueryParams } from "@utils/http/query-params-adder";
import { RequestMetaInfo } from "@utils/http/request-meta-info";
import { LastFmCallSigner } from "@lastfm/lastfm-call-signer";
import { LastFmScrobblePayload } from "@lastfm/lastfm-objects";

const formatQueryParams = ["format", "json"] as const;

const enum LastFmMethods {
    AuthGetSession = "auth.getSession",
    UserGetResentTracks = "user.getRecentTracks",
    TrackScrobble = "track.scrobble",
}

export class LastFmRequestsEnvironment {
    private _baseUrl: string;
    private _apiKey: string;
    private _callSigner: LastFmCallSigner;
    private _credentialStorage: CredentialStorage;

    public constructor(
        baseUrl: string,
        apiKey: string,
        callSigner: LastFmCallSigner,
        credentialStorage: CredentialStorage
    ) {
        this._baseUrl = baseUrl;
        this._apiKey = apiKey;
        this._callSigner = callSigner;
        this._credentialStorage = credentialStorage;
    }

    private _authUrl: URL = new URL("http://www.last.fm/api/auth/");

    public auth(cb: string): RequestMetaInfo {
        const url = new URL(this._authUrl);

        addQueryParams(url, {
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: this._apiKey,
            cb,
        });

        return {
            method: HttpMethod.Get,
            url,
        };
    }

    public getSession(token: string): RequestMetaInfo {
        const url = new URL(this._baseUrl);

        addQueryParams(url, {
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: this._apiKey,
            token,
            method: LastFmMethods.AuthGetSession,
        });

        this._appendCommonQueryParams(url);

        return {
            method: HttpMethod.Get,
            url,
        };
    }

    public getRecentTracks(
        user: string,
        extended: "0" | "1" = "0"
    ): RequestMetaInfo {
        const url = new URL(this._baseUrl);

        addQueryParams(url, {
            user,
            extended,
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: this._apiKey,
            method: LastFmMethods.UserGetResentTracks,
        });

        this._appendCommonQueryParams(url);

        return {
            url,
            method: HttpMethod.Get,
        };
    }

    public scrobble(params: LastFmScrobblePayload): RequestMetaInfo {
        const url = new URL(this._baseUrl);

        addQueryParams(url, {
            ...params,
            method: LastFmMethods.TrackScrobble,
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: this._apiKey,
            sk: this._credentialStorage.load()?.key,
        });

        this._appendCommonQueryParams(url);

        return {
            url,
            method: HttpMethod.Post,
        };
    }

    private _appendCommonQueryParams(url: URL): void {
        url.searchParams.append(
            "api_sig",
            this._callSigner.sign(url.searchParams)
        );

        url.searchParams.append(...formatQueryParams);
    }
}
