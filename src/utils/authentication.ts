import { EnvExtractor } from "@utils/env-extractor";

export function getAuthRedirectUrl(): URL {
    return new URL(
        `${EnvExtractor.basePath()}/auth-redirect`,
        window.location.origin
    );
}
