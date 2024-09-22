import { ScrobbleTrackPayload, Track } from "@domain/objects";

import {
    LastFmImage,
    LastFmImageSize,
    LastFmRecentTrack,
    LastFmScrobblePayload,
} from "@lastfm/lastfm-objects";

export function convertScrobbleTrackPayloadToLastFm(
    params: ScrobbleTrackPayload
): LastFmScrobblePayload {
    return {
        artist: params.artistName,
        timestamp: params.timestamp / 1000,
        track: params.trackName,
        album: params.albumTitle,
        mbid: params.mbid,
        trackNumber: params.trackNumber,
    };
}

export function convertRecentTrackFromLastFm(
    lastFmRecentTrack: LastFmRecentTrack
): Track {
    return {
        title: lastFmRecentTrack.name,
        albumTitle: lastFmRecentTrack.album["#text"],
        artistName: lastFmRecentTrack.artist.name,
        lastFmUrl: lastFmRecentTrack.url,
        timestamp: lastFmRecentTrack.date.uts,
        isLoved: lastFmRecentTrack.loved === "1",
        imageUrl: lastFmRecentTrack.image.find(findLargeImage)?.["#text"],
    };
}

function findLargeImage(image: LastFmImage): boolean {
    return image.size === LastFmImageSize.Large;
}
