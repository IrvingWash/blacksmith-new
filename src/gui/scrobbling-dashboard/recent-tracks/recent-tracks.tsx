import React, { useEffect } from "react";
import { useObservable } from "@ui-kit/hooks/use-observable";
import { RecentTracksViewModel } from "@gui/scrobbling-dashboard/recent-tracks/recent-tracks-view-model";
import s from "./recent-tracks.module.css";

interface RecentTracksProps {
    model: RecentTracksViewModel;
}

export function RecentTracks(props: RecentTracksProps): React.JSX.Element {
    const model = props.model;

    const recentTracks = useObservable(model.recentTracks$);
    const isLoading = useObservable(model.isLoading$);

    useEffect(() => {
        model.refresh();
    }, [model.refresh]);

    return (
        <div className={s.container}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                recentTracks.map((track) => {
                    return (
                        <div key={`${track.title}${track.timestamp}`}>
                            <p>{track.artistName}</p>
                            <p>{track.albumTitle}</p>
                            <p>{track.title}</p>
                            <p>
                                {new Date(
                                    Number(track.timestamp) * 1000
                                ).toLocaleString()}
                            </p>
                            <p>{track.isLoved}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
}
