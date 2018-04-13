import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

export function renameKeysMap<T>(src: Map<any, T>, km: IObjectOf<T>): Map<any, T> {
    const dest = empty(src, Map);
    for (let p of src) {
        const k = p[0];
        const kk = km[k];
        dest.set(kk !== undefined ? kk : k, p[1]);
    }
    return dest;
}

export function renameKeysObj(src: any, km: IObjectOf<PropertyKey>) {
    const dest = {};
    for (let k in src) {
        const kk = km[k];
        dest[kk != null ? kk : k] = src[k];
    }
    return dest;
}
