import { IObjectOf } from "@thi.ng/api/api";

export function renameKeysObj(src: any, km: IObjectOf<PropertyKey>) {
    const dest = {};
    for (let k in src) {
        const kk = km[k];
        dest[kk !== undefined ? kk : k] = src[k];
    }
    return dest;
}
