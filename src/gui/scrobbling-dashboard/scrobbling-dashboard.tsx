import React from "react";
import { ScrobblingDashboardViewModel } from "@gui/scrobbling-dashboard/scrobbling-dashboard-view-model";
import { AlbumScrobbler } from "@gui/scrobbling-dashboard/album-scrobbler/album-scrobbler";
import s from "./scrobbling-dashboard.module.css";

interface ScrobblingDashboardProps {
    model: ScrobblingDashboardViewModel;
}

export function ScrobblingDashboard(
    props: ScrobblingDashboardProps
): React.JSX.Element {
    const model = props.model;

    return (
        <div className={s.container}>
            <AlbumScrobbler model={model.albumScrobblerModel()} />
        </div>
    );
}
