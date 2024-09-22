export interface LastFmGetSessionResponse {
    session: {
        key: string;
        name: string;
        subscriber: unknown;
    };
}

export interface LastFmRecentTracks {
    recenttracks: {
        "@attr": {
            page: string;
            perPage: string;
            total: string;
            totalPages: string;
            user: string;
        };
        track: LastFmRecentTrack[];
    };
}

export interface LastFmRecentTrack {
    album: {
        "#text": string;
        mbid: string;
    };
    artist: {
        name: string;
        mbid: string;
    };
    date: {
        "#text": string;
        uts: string;
    };
    image: LastFmImage[];
    mbid: string;
    name: string;
    streamable: string;
    url: string;
    loved: "0" | "1";
}

export interface LastFmImage {
    /**
     * URL to the image
     */
    "#text": string;
    size: LastFmImageSize;
}

export const enum LastFmImageSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
    ExtraLarge = "extralarge",
    Mega = "mega",
}
