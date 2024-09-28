import { RecentTrack } from "@domain/objects";
import { Observable, Signal } from "@utils/observable";

export class RecentTracksViewModel {
    public recentTracks$: Observable<RecentTrack[]>;
    public isLoading$: Observable<boolean>;

    private _getRecentTracks: (username: string) => Promise<RecentTrack[]>;
    private _shouldRefresh: Signal;

    public constructor(
        recentTracksGetter: (username: string) => Promise<RecentTrack[]>,
        shouldRefresh$: Signal
    ) {
        this._getRecentTracks = recentTracksGetter;

        this.recentTracks$ = new Observable<RecentTrack[]>([]);
        this.isLoading$ = new Observable(false);
        this._shouldRefresh = shouldRefresh$;

        this._shouldRefresh.subscribe(this.refresh.bind(this));
    }

    public async refresh(): Promise<void> {
        this.isLoading$.setValue(true);

        // TODO: Hardcode
        this.recentTracks$.setValue(await this._getRecentTracks("IrvingWash"));

        this.isLoading$.setValue(false);
    }
}
