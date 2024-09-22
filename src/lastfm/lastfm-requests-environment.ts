import { HttpMethod } from "@utils/http/http-method";
import { RequestMetaInfo } from "@utils/http/request-meta-info";

const enum AuthQueryParams {
    // biome-ignore lint/style/useNamingConvention: Foreign API naming
    api_key = "api_key",
    // biome-ignore lint/style/useNamingConvention: Foreign API naming
    cb = "cb",
}

export class LastFmRequestsEnvironment {
    private _authUrl: URL = new URL("http://www.last.fm/api/auth/");

    public auth(apiKey: string, callbackUrl: string): RequestMetaInfo {
        const url = new URL(this._authUrl);
        url.searchParams.append(AuthQueryParams.api_key, apiKey);
        url.searchParams.append(AuthQueryParams.cb, callbackUrl);

        return {
            method: HttpMethod.Get,
            url,
        };
    }
}
