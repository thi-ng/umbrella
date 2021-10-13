import { map } from "./map.js";

export const objectIterator = (x: any) => map((k) => [k, x[k]], Object.keys(x));

export const maybeObjectIterator = (x: any) =>
    (x != null &&
        typeof x === "object" &&
        Object.prototype.toString.call(x) !== "[object Generator]" &&
        objectIterator(x)) ||
    undefined;
