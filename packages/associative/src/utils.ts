import type { Pair } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isMap } from "@thi.ng/checks/is-map";
import { isIllegalKey } from "@thi.ng/checks/is-proto-path";
import { isSet } from "@thi.ng/checks/is-set";

export const empty = (x: any, ctor: Function) =>
    implementsFunction(x, "empty")
        ? x.empty()
        : new (x[Symbol.species] || ctor)();

export const copy = (x: any, ctor: Function) =>
    implementsFunction(x, "copy")
        ? x.copy()
        : new (x[Symbol.species] || ctor)(x);

export const copyObj = (x: any) => {
    const res: any = {};
    for (let k in x) {
        !isIllegalKey(k) && (res[k] = x[k]);
    }
    return res;
};

export const first = <T>(x: Iterable<T>) => x[Symbol.iterator]().next().value;

export const objValues = (src: any) => {
    const vals = [];
    for (let k in src) {
        src.hasOwnProperty(k) && vals.push(src[k]);
    }
    return vals;
};

export const ensureMap = <K, V>(x: Iterable<Pair<K, V>>) =>
    isMap(x) ? <Map<K, V>>x : new Map<K, V>(x);

export const ensureSet = <T>(x: Iterable<T>) =>
    isSet(x) ? <Set<T>>x : new Set<T>(x);
