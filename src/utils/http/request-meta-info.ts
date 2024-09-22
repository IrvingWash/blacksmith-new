import { HttpMethod } from "@utils/http/http-method";

export interface RequestMetaInfo {
    url: URL;
    method: HttpMethod;
}
