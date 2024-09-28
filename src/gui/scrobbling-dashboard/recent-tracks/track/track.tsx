import React from "react";
import { RecentTrack } from "@domain/objects";
import s from "./track.module.css";

interface TrackProps {
    track: RecentTrack;
}

export function Track(props: TrackProps): React.JSX.Element {
    const track = props.track;

    return (
        <div className={s.container}>
            <div>
                <img
                    src={track.lastFmImageUrl}
                    width={120}
                    height={120}
                    alt="Album cover"
                />
            </div>
            <div className={s.description}>
                <p>{track.artistName}</p>
                <p>{track.albumTitle}</p>
                <p>{track.title}</p>
            </div>
        </div>
    );
}
