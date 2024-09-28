import { TrackScrobblingResult } from "@domain/objects";
import { Signal } from "@utils/observable";
import { LastFm } from "@lastfm/lastfm";
import { AlbumScrobblerViewModel } from "@gui/scrobbling-dashboard/album-scrobbler/album-scrobbler-view-model";
import { RecentTracksViewModel } from "@gui/scrobbling-dashboard/recent-tracks/recent-tracks-view-model";

export class ScrobblingDashboardViewModel {
    private _lastFm: LastFm;
    private _albumScrobblerModel: AlbumScrobblerViewModel;
    private _recentTracksModel: RecentTracksViewModel;
    private _shouldRefreshSignal$: Signal;

    public constructor(lastFm: LastFm, username: string) {
        this._lastFm = lastFm;
        this._shouldRefreshSignal$ = new Signal();

        this._albumScrobblerModel = new AlbumScrobblerViewModel(
            this._scrobbleAlbum,
            this._shouldRefreshSignal$
        );

        this._recentTracksModel = new RecentTracksViewModel(
            () => this._lastFm.recentTracks(username),
            this._shouldRefreshSignal$
        );
    }

    public albumScrobblerModel(): AlbumScrobblerViewModel {
        return this._albumScrobblerModel;
    }

    public recentTracksModel(): RecentTracksViewModel {
        return this._recentTracksModel;
    }

    private _scrobbleAlbum = (
        artist: string,
        album: string,
        autocorrect: boolean
    ): Promise<TrackScrobblingResult> => {
        return this._lastFm.scrobbleAlbum(artist, album, autocorrect);
    };
}
