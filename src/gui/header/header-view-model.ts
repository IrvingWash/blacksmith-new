import { CredentialStorage } from "@utils/credential-storage";
import { Observable } from "@utils/observable";

export class HeaderViewModel {
    public username$: Observable<string | null>;

    private readonly _credentialStorage: CredentialStorage;
    private readonly _signIn: () => Promise<void>;
    private readonly _signOut: () => void;

    public constructor(
        credentialStorage: CredentialStorage,
        signInHandler: () => Promise<void>,
        signOutHandler: () => void
    ) {
        this._credentialStorage = credentialStorage;
        this._signIn = signInHandler;
        this._signOut = signOutHandler;

        this.username$ = new Observable(
            this._credentialStorage.load()?.name ?? null
        );
    }

    public async signIn(): Promise<void> {
        await this._signIn();

        this.username$.setValue(this._credentialStorage.load()?.name ?? null);
    }

    public signOut(): void {
        this._signOut();

        this.username$.setValue(null);
    }
}
