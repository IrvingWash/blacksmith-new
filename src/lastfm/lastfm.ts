import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmAuthorizationProvider } from "@lastfm/lastfm-authorization-provider";

export class LastFm {
    private readonly _requestsEnvironment: LastFmRequestsEnvironment;
    private readonly _authorizationProvider: LastFmAuthorizationProvider;

    public constructor() {
        this._requestsEnvironment = new LastFmRequestsEnvironment();
        this._authorizationProvider = new LastFmAuthorizationProvider(
            this._requestsEnvironment
        );
    }
}
