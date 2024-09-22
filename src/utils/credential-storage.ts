import { UserCredentials } from "@domain/objects";

export class CredentialStorage {
    private readonly _key: string = "blacksmith-credentials";

    public save(credentials: UserCredentials) {
        localStorage.setItem(this._key, JSON.stringify(credentials));
    }

    public load(): UserCredentials | null {
        const item = localStorage.getItem(this._key);

        if (item === null) {
            return null;
        }

        try {
            return JSON.parse(item);
        } catch {
            return null;
        }
    }

    public clear() {
        localStorage.removeItem(this._key);
    }
}
