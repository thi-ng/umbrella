import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

export function selectKeysMap<K, V>(src: Map<K, V>, ks: Iterable<K>): any {
    const dest = empty(src, Map);
    for (let k of ks) {
        if (src.has(k)) {
            dest.set(k, src.get(k));
        }
    }
    return dest;
}

export function selectKeysObj<T>(src: IObjectOf<T>, ks: Iterable<PropertyKey>): any {
    const dest: IObjectOf<T> = {};
    for (let k of ks) {
        if (src.hasOwnProperty(k)) {
            dest[k] = src[k];
        }
    }
    return dest;
}
