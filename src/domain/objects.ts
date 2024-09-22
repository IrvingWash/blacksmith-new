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
