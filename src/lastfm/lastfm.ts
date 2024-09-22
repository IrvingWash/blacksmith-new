import { EnvExtractor } from "@utils/env-extractor";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmAuthorizationProvider } from "@lastfm/lastfm-authorization-provider";
import { LastFmCallSigner } from "@lastfm/lastfm-call-signer";

const baseUrl = "http://ws.audioscrobbler.com/2.0/";

export class LastFm {
    private readonly _requestsEnvironment: LastFmRequestsEnvironment;
    private readonly _authorizationProvider: LastFmAuthorizationProvider;

    public constructor() {
        const callSigner = new LastFmCallSigner(
            EnvExtractor.lastFmSharedSecret()
        );

        this._requestsEnvironment = new LastFmRequestsEnvironment(
            baseUrl,
            callSigner
        );
        this._authorizationProvider = new LastFmAuthorizationProvider(
            this._requestsEnvironment,
            EnvExtractor.lastFmApiKey()
        );
    }

    public async signIn(): Promise<void> {
        await this._authorizationProvider.signIn();
    }
}
