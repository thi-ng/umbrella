import { implementsFunction } from "@thi.ng/checks";

export const empty = (x, ctor) =>
    implementsFunction(x, "empty")
        ? x.empty()
        : new (x[Symbol.species] || ctor)();

export const copy = (x, ctor) =>
    implementsFunction(x, "copy")
        ? x.copy()
        : new (x[Symbol.species] || ctor)(x);

export const first = <T>(x: Iterable<T>) => x[Symbol.iterator]().next().value;

export const objValues = (src: any) => {
    const vals = [];
    for (let k in src) {
        src.hasOwnProperty(k) && vals.push(src[k]);
    }
    return vals;
};
