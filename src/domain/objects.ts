export interface Track {
    title: string;
    albumTitle: string;
    artistName: string;
    lastFmUrl: string;
    timestamp: string;
    isLoved: boolean;
    imageUrl: string | undefined;
}

export interface UserCredentials {
    name: string;
    key: string;
}

export interface ScrobbleTrackPayload {
    artistName: string;
    trackName: string;
    timestamp: number;
    trackNumber?: number;
    albumTitle?: string;
    mbid?: string;
}
