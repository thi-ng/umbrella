import type { IObjectOf } from "@thi.ng/api";
import { ensureSet } from "./checks.js";
import { empty } from "./empty.js";

export const withoutKeysMap = <K, V>(src: Map<K, V>, keys: Iterable<K>) => {
    const ks = ensureSet(keys);
    const dest = empty(src, Map);
    for (let p of src.entries()) {
        const k = p[0];
        !ks.has(k) && dest.set(k, p[1]);
    }
    return dest;
};

export const withoutKeysObj = <T>(
    src: IObjectOf<T>,
    keys: Iterable<PropertyKey>
) => {
    const ks = ensureSet(keys);
    const dest: IObjectOf<T> = {};
    for (let k in src) {
        src.hasOwnProperty(k) && !ks.has(k) && (dest[k] = src[<any>k]);
    }
    return dest;
};
