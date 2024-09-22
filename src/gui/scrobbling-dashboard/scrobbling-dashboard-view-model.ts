import { TrackScrobblingResult } from "@domain/objects";
import { LastFm } from "@lastfm/lastfm";
import { AlbumScrobblerViewModel } from "@gui/scrobbling-dashboard/album-scrobbler/album-scrobbler-view-model";

export class ScrobblingDashboardViewModel {
    private _lastFm: LastFm;
    private _albumScrobblerModel: AlbumScrobblerViewModel;

    public constructor(lastFm: LastFm) {
        this._lastFm = lastFm;
        this._albumScrobblerModel = new AlbumScrobblerViewModel(
            this._scrobbleAlbum
        );
    }

    public albumScrobblerModel(): AlbumScrobblerViewModel {
        return this._albumScrobblerModel;
    }

    private _scrobbleAlbum = (
        artist: string,
        album: string,
        autocorrect: boolean
    ): Promise<TrackScrobblingResult> => {
        return this._lastFm.scrobbleAlbum(artist, album, autocorrect);
    };
}
