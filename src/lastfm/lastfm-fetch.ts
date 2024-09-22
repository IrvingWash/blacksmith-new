import { RequestMetaInfo } from "@utils/http/request-meta-info";

export async function lastFmFetch<T>(
    requestMetaInfo: RequestMetaInfo
): Promise<T> {
    const response = await fetch(requestMetaInfo.url, {
        method: requestMetaInfo.method,
    });

    return response.json();
}
