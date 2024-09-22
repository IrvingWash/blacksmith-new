import { HttpMethod } from "@utils/http/http-method";
import { addQueryParams } from "@utils/http/query-params-adder";
import { RequestMetaInfo } from "@utils/http/request-meta-info";
import { LastFmCallSigner } from "@lastfm/lastfm-call-signer";

const formatQueryParams = ["format", "json"] as const;

const enum LastFmMethods {
    AuthGetSession = "auth.getSession",
}

export class LastFmRequestsEnvironment {
    private _baseUrl: string;
    private _callSigner: LastFmCallSigner;

    public constructor(baseUrl: string, callSigner: LastFmCallSigner) {
        this._baseUrl = baseUrl;
        this._callSigner = callSigner;
    }

    private _authUrl: URL = new URL("http://www.last.fm/api/auth/");

    public auth(apiKey: string, cb: string): RequestMetaInfo {
        const url = new URL(this._authUrl);

        addQueryParams(url, {
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: apiKey,
            cb,
        });

        return {
            method: HttpMethod.Get,
            url,
        };
    }

    public getSession(apiKey: string, token: string): RequestMetaInfo {
        const url = new URL(this._baseUrl);

        addQueryParams(url, {
            // biome-ignore lint/style/useNamingConvention: External API
            api_key: apiKey,
            token,
            method: LastFmMethods.AuthGetSession,
        });

        this._appendCommonQueryParams(url);

        return {
            method: HttpMethod.Get,
            url,
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
