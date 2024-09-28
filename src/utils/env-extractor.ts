import { ensureExists } from "@utils/ensure-exists";

const enum EnvVarNames {
    LastFmApiKey = "VITE_LAST_FM_API_KEY",
    LastFmSharedSecret = "VITE_LAST_FM_SHARED_SECRET",
    BasePath = "VITE_BASE_PATH",
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

    public static basePath(): string {
        return ensureExists(EnvExtractor._envVariable(EnvVarNames.BasePath));
    }

    private static _envVariable(name: string): string | undefined {
        return import.meta.env[name];
    }
}
