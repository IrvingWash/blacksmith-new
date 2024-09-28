import React, { useEffect } from "react";
import { useObservable } from "@ui-kit/hooks/use-observable";
import { ActionButton } from "@ui-kit/components/action-button/action-button";
import { SectionTitle } from "@ui-kit/components/section-title/section-title";
import { RecentTracksViewModel } from "@gui/scrobbling-dashboard/recent-tracks/recent-tracks-view-model";
import { Track } from "@gui/scrobbling-dashboard/recent-tracks/track/track";
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
            <SectionTitle
                title="recent scrobbles"
                className={s.header}
            />

            <ActionButton
                className={s.refreshButton}
                onClick={() => model.refresh()}
                disabled={isLoading}
            >
                Refresh
            </ActionButton>

            <div className={s.display}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    recentTracks.map((track) => {
                        return (
                            <Track
                                key={`${track.lastFmUrl}${track.timestamp}`}
                                track={track}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
