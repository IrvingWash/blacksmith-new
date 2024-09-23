import { RecentTrack } from "@domain/objects";
import { Observable } from "@utils/observable";

export class RecentTracksViewModel {
    public recentTracks$: Observable<RecentTrack[]>;
    public isLoading$: Observable<boolean>;

    private _getRecentTracks: (username: string) => Promise<RecentTrack[]>;

    public constructor(
        recentTracksGetter: (username: string) => Promise<RecentTrack[]>
    ) {
        this._getRecentTracks = recentTracksGetter;

        this.recentTracks$ = new Observable<RecentTrack[]>([]);
        this.isLoading$ = new Observable(false);
    }

    public async refresh(): Promise<void> {
        this.isLoading$.setValue(true);

        // TODO: Hardcode
        this.recentTracks$.setValue(await this._getRecentTracks("IrvingWash"));

        this.isLoading$.setValue(false);
    }
}
