import { LastFmRequestsEnvironment } from "@lastfm/lastfm-requests-environment";
import { lastFmFetch } from "@lastfm/lastfm-fetch";
import {
    LastFmAlbumInfo,
    LastFmGetAlbumInfoPayload,
    LastFmRecentTracks,
    LastFmScrobbleResult,
    LastFmScrobblePayload as LastFmScrobbleTrackPayload,
} from "@lastfm/lastfm-objects";

export class LastFmTransport {
    private readonly _requestsEnvironment: LastFmRequestsEnvironment;

    public constructor(requestsEnvironment: LastFmRequestsEnvironment) {
        this._requestsEnvironment = requestsEnvironment;
    }

    public getRecentTracks(
        username: string,
        extended = false
    ): Promise<LastFmRecentTracks> {
        const requestMetaInfo = this._requestsEnvironment.getRecentTracks(
            username,
            extended ? "1" : "0"
        );

        return lastFmFetch(requestMetaInfo);
    }

    public scrobble(
        params: LastFmScrobbleTrackPayload
    ): Promise<LastFmScrobbleResult> {
        const requestMetaInfo = this._requestsEnvironment.scrobble(params);

        return lastFmFetch(requestMetaInfo);
    }

    public getAlbumInfo(
        params: LastFmGetAlbumInfoPayload
    ): Promise<LastFmAlbumInfo> {
        const requestMetaInfo = this._requestsEnvironment.getAlbumInfo(params);

        return lastFmFetch(requestMetaInfo);
    }
}
