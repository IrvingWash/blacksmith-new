import React from "react";
import { useObservable } from "@ui-kit/hooks/use-observable";
import { Greeter } from "@gui/greeter/greeter";
import { Header } from "@gui/header/header";
import { AppViewModel } from "@gui/app-view-model";
import { LastFmAuthRedirect } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect";
import { ScrobblingDashboard } from "@gui/scrobbling-dashboard/scrobbling-dashboard";
import s from "./app.module.css";

interface AppProps {
    model: AppViewModel;
}

export function App(props: AppProps): React.JSX.Element {
    const model = props.model;

    const isSignedIn = useObservable(model.isSignedIn$);

    return (
        <>
            {model.isAuthenticating ? (
                <LastFmAuthRedirect model={model.authRedirectModel()} />
            ) : (
                <>
                    <Header model={model.headerModel()} />
                    <main className={s.container}>
                        {isSignedIn ? (
                            <ScrobblingDashboard
                                model={model.scrobblingDashboardModel()}
                            />
                        ) : (
                            <Greeter />
                        )}
                    </main>
                </>
            )}
        </>
    );
}
