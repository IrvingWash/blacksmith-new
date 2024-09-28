import { RecentTrack } from "@domain/objects";
import { Observable, Signal } from "@utils/observable";

export class RecentTracksViewModel {
    public recentTracks$: Observable<RecentTrack[]>;
    public isLoading$: Observable<boolean>;

    private _getRecentTracks: () => Promise<RecentTrack[]>;
    private _shouldRefresh: Signal;

    public constructor(
        recentTracksGetter: () => Promise<RecentTrack[]>,
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

        this.recentTracks$.setValue(await this._getRecentTracks());

        this.isLoading$.setValue(false);
    }
}
