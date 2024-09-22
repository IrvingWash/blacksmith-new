export function addQueryParams(url: URL, params: Record<string, string>) {
    for (const [k, v] of Object.entries(params)) {
        url.searchParams.append(k, v);
    }
}
