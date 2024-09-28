import { TrackScrobblingResult } from "@domain/objects";
import { Observable } from "@utils/observable";

export class AlbumScrobblerViewModel {
    public readonly artist$: Observable<string | null>;
    public readonly album$: Observable<string | null>;
    public readonly isBlocked$: Observable<boolean>;
    private readonly _shouldRefresh$: Observable<undefined>;

    private readonly _scrobbleAlbum: (
        artist: string,
        album: string,
        autoCorrect: boolean
    ) => Promise<TrackScrobblingResult>;

    public constructor(
        albumScrobbler: (
            artist: string,
            album: string,
            autoCorrect: boolean
        ) => Promise<TrackScrobblingResult>,
        shouldRefresh$: Observable<undefined>
    ) {
        this.artist$ = new Observable<string | null>(null);
        this.album$ = new Observable<string | null>(null);
        this.isBlocked$ = new Observable(false);
        this._scrobbleAlbum = albumScrobbler;
        this._shouldRefresh$ = shouldRefresh$;
    }

    public setArtist(value: string | null): void {
        this.artist$.setValue(value);
    }

    public setAlbum(value: string | null): void {
        this.album$.setValue(value);
    }

    public async scrobble(): Promise<void> {
        this.isBlocked$.setValue(true);

        await this._scrobbleAlbum(
            this.artist$.value() ?? "",
            this.album$.value() ?? "",
            true
        );

        this.isBlocked$.setValue(false);
        this._clear();

        this._shouldRefresh$.setValue(undefined);
    }

    private _clear(): void {
        this.setArtist(null);
        this.setAlbum(null);
    }
}
