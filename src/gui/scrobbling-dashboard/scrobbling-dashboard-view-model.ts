import { TrackScrobblingResult } from "@domain/objects";
import { Observable } from "@utils/observable";
import { LastFm } from "@lastfm/lastfm";
import { AlbumScrobblerViewModel } from "@gui/scrobbling-dashboard/album-scrobbler/album-scrobbler-view-model";
import { RecentTracksViewModel } from "@gui/scrobbling-dashboard/recent-tracks/recent-tracks-view-model";

export class ScrobblingDashboardViewModel {
    private _lastFm: LastFm;
    private _albumScrobblerModel: AlbumScrobblerViewModel;
    private _recentTracksModel: RecentTracksViewModel;
    private _shouldRefresh$: Observable<undefined>;

    public constructor(lastFm: LastFm) {
        this._lastFm = lastFm;
        this._shouldRefresh$ = new Observable(undefined);

        this._albumScrobblerModel = new AlbumScrobblerViewModel(
            this._scrobbleAlbum,
            this._shouldRefresh$
        );

        this._recentTracksModel = new RecentTracksViewModel(
            this._lastFm.recentTracks.bind(this._lastFm),
            this._shouldRefresh$
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
