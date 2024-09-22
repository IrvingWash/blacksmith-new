export function getAuthRedirectUrl(): URL {
    return new URL("auth-redirect", window.location.origin);
}
