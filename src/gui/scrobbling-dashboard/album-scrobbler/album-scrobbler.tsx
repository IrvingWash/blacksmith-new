import React, { ChangeEvent } from "react";
import { SectionTitle } from "@ui-kit/components/section-title/section-title";
import { FormInput } from "@ui-kit/components/form-input/form-input";
import { ActionButton } from "@ui-kit/components/action-button/action-button";
import { AlbumScrobblerViewModel } from "@gui/scrobbling-dashboard/album-scrobbler/album-scrobbler-view-model";
import s from "./album-scrobbler.module.css";
import { useObservable } from "@ui-kit/hooks/use-observable";

interface AlbumScrobblerProps {
    model: AlbumScrobblerViewModel;
}

export function AlbumScrobbler(props: AlbumScrobblerProps): React.JSX.Element {
    const model = props.model;

    const artist = useObservable(model.artist$);
    const album = useObservable(model.album$);
    const isBlocked = useObservable(model.isBlocked$);

    return (
        <div className={s.container}>
            <SectionTitle
                title="scrobble album"
                className={s.header}
            />

            <form
                onSubmit={formSubmitHandler}
                className={s.form}
            >
                <FormInput
                    onChange={artistInputChangeHandler}
                    value={artist ?? ""}
                    required
                    placeholder="artist"
                    disabled={isBlocked}
                />
                <FormInput
                    onChange={albumInputChangeHandler}
                    value={album ?? ""}
                    required
                    placeholder="album"
                    disabled={isBlocked}
                />
                <ActionButton
                    type="submit"
                    disabled={isBlocked}
                >
                    scrobble
                </ActionButton>
            </form>
        </div>
    );

    function formSubmitHandler(event: ChangeEvent<HTMLFormElement>): void {
        event.preventDefault();

        model.scrobble();
    }

    function artistInputChangeHandler(
        event: ChangeEvent<HTMLInputElement>
    ): void {
        model.setArtist(event.target.value);
    }

    function albumInputChangeHandler(
        event: ChangeEvent<HTMLInputElement>
    ): void {
        model.setAlbum(event.target.value);
    }
}
