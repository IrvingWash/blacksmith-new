import { Track } from "@domain/objects";
import { EnvExtractor } from "@utils/env-extractor";
import { CredentialStorage } from "@utils/credential-storage";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmAuthorizationProvider } from "@lastfm/lastfm-authorization-provider";
import { LastFmCallSigner } from "@lastfm/lastfm-call-signer";
import { LastFmTransport } from "@lastfm/lastfm-transport";
import { convertRecentTrack } from "@lastfm/lastfm-converters";

const baseUrl = "http://ws.audioscrobbler.com/2.0/";

export class LastFm {
    private readonly _requestsEnvironment: LastFmRequestsEnvironment;
    private readonly _authorizationProvider: LastFmAuthorizationProvider;
    private readonly _transport: LastFmTransport;

    public constructor(credentialStorage: CredentialStorage) {
        const apiKey = EnvExtractor.lastFmApiKey();

        const callSigner = new LastFmCallSigner(
            EnvExtractor.lastFmSharedSecret()
        );

        this._requestsEnvironment = new LastFmRequestsEnvironment(
            baseUrl,
            apiKey,
            callSigner
        );

        this._authorizationProvider = new LastFmAuthorizationProvider(
            this._requestsEnvironment,
            credentialStorage
        );

        this._transport = new LastFmTransport(this._requestsEnvironment);
    }

    public async signIn(): Promise<void> {
        await this._authorizationProvider.signIn();
    }

    public async recentTracks(username: string): Promise<Track[]> {
        const lastFmRecentTracks = await this._transport.getRecentTracks(
            username,
            true
        );

        return lastFmRecentTracks.recenttracks.track.map(convertRecentTrack);
    }
}
