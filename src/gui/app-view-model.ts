import { CredentialStorage } from "@utils/credential-storage";
import { LastFm } from "@lastfm/lastfm";
import { HeaderViewModel } from "@gui/header/header-view-model";
import { LastFmAuthRedirectViewModel } from "@gui/lastfm-auth-redirect/lastfm-auth-redirect-view-model";
import { Observable } from "@utils/observable";

export class AppViewModel {
    public isAuthenticating: boolean;
    public isSignedIn$: Observable<boolean>;

    private readonly _credentialStorage: CredentialStorage;
    private readonly _lastFm: LastFm;
    private readonly _headerModel: HeaderViewModel;
    private readonly _authRedirectModel: LastFmAuthRedirectViewModel;

    public constructor() {
        this.isAuthenticating =
            window.location.pathname.includes("auth-redirect");

        this._credentialStorage = new CredentialStorage();
        this._lastFm = new LastFm(this._credentialStorage);
        this._headerModel = new HeaderViewModel(
            this._credentialStorage,
            this._signInHandler,
            this._signOutHandler
        );

        this._authRedirectModel = new LastFmAuthRedirectViewModel();

        this.isSignedIn$ = new Observable(
            this._credentialStorage.load()?.name !== undefined
        );
    }

    private _signInHandler = async (): Promise<void> => {
        await this._lastFm.signIn();

        this.isSignedIn$.setValue(
            this._credentialStorage.load()?.name !== undefined
        );
    };

    private _signOutHandler = () => {
        this._lastFm.signOut();

        this.isSignedIn$.setValue(false);
    };

    public headerModel(): HeaderViewModel {
        return this._headerModel;
    }

    public authRedirectModel(): LastFmAuthRedirectViewModel {
        return this._authRedirectModel;
    }
}
