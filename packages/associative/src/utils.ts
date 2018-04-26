import { implementsFunction } from "@thi.ng/checks/implements-function";

export const empty = (x, ctor) =>
    implementsFunction(x, "empty") ? x.empty() : new (x[Symbol.species] || ctor)();

export const copy = (x, ctor) =>
    implementsFunction(x, "copy") ? x.copy() : new (x[Symbol.species] || ctor)(x);

export const first = (x: Iterable<any>) =>
    x[Symbol.iterator]().next().value;

export const objValues = (src: any) => {
    const vals = [];
    for (let k in src) {
        vals.push(src[k]);
    }
    return vals;
};
