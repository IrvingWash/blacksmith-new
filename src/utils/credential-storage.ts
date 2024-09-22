interface Credentials {
    key: string;
    name: string;
}

export class CredentialStorage {
    private readonly _key: string = "blacksmith-credentials";

    public save(credentials: Credentials) {
        localStorage.setItem(this._key, JSON.stringify(credentials));
    }

    public load(): Credentials | null {
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
