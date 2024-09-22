import { ensureExists } from "@utils/ensure-exists";

const enum EnvVarNames {
    LastFmApiKey = "VITE_LAST_FM_API_KEY",
    LastFmSharedSecret = "VITE_LAST_FM_SHARED_SECRET",
}

export class EnvExtractor {
    public static lastFmApiKey(): string {
        return ensureExists(
            EnvExtractor._envVariable(EnvVarNames.LastFmApiKey)
        );
    }

    public static lastFmSharedSecret(): string {
        return ensureExists(
            EnvExtractor._envVariable(EnvVarNames.LastFmSharedSecret)
        );
    }

    private static _envVariable(name: string): string | undefined {
        return import.meta.env[name];
    }
}
