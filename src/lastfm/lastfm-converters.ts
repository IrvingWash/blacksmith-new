import { Track } from "@domain/objects";

import {
    LastFmImage,
    LastFmImageSize,
    LastFmRecentTrack,
} from "@lastfm/lastfm-objects";

export function convertRecentTrack(
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
