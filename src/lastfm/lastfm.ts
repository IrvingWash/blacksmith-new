import {
    RequestAlbumInfoPayload,
    ScrobbleTrackPayload,
    RecentTrack,
    TrackScrobblingResult,
    AlbumInfo,
} from "@domain/objects";

import { EnvExtractor } from "@utils/env-extractor";
import { CredentialStorage } from "@utils/credential-storage";
import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { LastFmAuthorizationProvider } from "@lastfm/lastfm-authorization-provider";
import { LastFmCallSigner } from "@lastfm/lastfm-call-signer";
import { LastFmTransport } from "@lastfm/lastfm-transport";

import {
    convertAlbumInfoFromLastFm,
    convertRecentTrackFromLastFm,
    convertRequestAlbumInfoPayloadToLastFm,
    convertScrobbleTrackPayloadToLastFm,
    convertScrobblingResultFromLastFm,
} from "@lastfm/lastfm-converters";
import { extractErrorMessage } from "@utils/error-message-extractor";

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
            callSigner,
            credentialStorage
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

    public async recentTracks(username: string): Promise<RecentTrack[]> {
        const lastFmRecentTracks = await this._transport.getRecentTracks(
            username,
            true
        );

        return lastFmRecentTracks.recenttracks.track.map(
            convertRecentTrackFromLastFm
        );
    }

    public async scrobbleTrack(
        params: ScrobbleTrackPayload
    ): Promise<TrackScrobblingResult> {
        const result = await this._transport.scrobble(
            convertScrobbleTrackPayloadToLastFm(params)
        );

        return convertScrobblingResultFromLastFm(result);
    }

    public async albumInfo(
        params: RequestAlbumInfoPayload
    ): Promise<AlbumInfo> {
        const result = await this._transport.getAlbumInfo(
            convertRequestAlbumInfoPayloadToLastFm(params)
        );

        return convertAlbumInfoFromLastFm(result);
    }

    public async scrobbleAlbum(
        artist: string,
        album: string,
        autoCorrect: boolean
    ): Promise<TrackScrobblingResult> {
        const albumInfo = await this.albumInfo({
            albumTitle: album,
            artistName: artist,
            autoCorrect,
        });

        const scrobblePromises: Promise<TrackScrobblingResult>[] = [];
        const timestamp = Date.now();

        for (const track of albumInfo.tracks) {
            scrobblePromises.push(
                this.scrobbleTrack({
                    artistName: track.artistName,
                    timestamp: timestamp + track.trackNumber,
                    trackName: track.title,
                    albumTitle: albumInfo.title,
                    trackNumber: track.trackNumber,
                })
            );
        }

        let scrobblingResults: TrackScrobblingResult[] = [];
        try {
            scrobblingResults = await Promise.all(scrobblePromises);
        } catch (error) {
            return {
                accepted: false,
                ignoringMessage: extractErrorMessage(error),
            };
        }

        for (const result of scrobblingResults) {
            if (!result.accepted || result.ignoringMessage !== undefined) {
                return result;
            }
        }

        return {
            accepted: true,
        };
    }
}
