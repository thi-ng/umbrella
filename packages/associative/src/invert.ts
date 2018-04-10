import { IObjectOf } from "@thi.ng/api/api";

import { empty } from "./utils";

export function invertMap<K, V>(src: Map<K, V>) {
    const dest: Map<V, K> = empty(src, Map);
    for (let p of src) {
        dest.set(p[1], p[0]);
    }
    return dest;
}

export function invertObj(src: IObjectOf<PropertyKey>) {
    const dest: IObjectOf<PropertyKey> = {};
    for (let k in src) {
        dest[src[k]] = k;
    }
    return dest;
}
