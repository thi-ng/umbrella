import { map } from "./map";

export function objectIterator(x: any) {
    return map((k) => [k, x[k]], Object.keys(x));
}

export function maybeObjectIterator(x: any) {
    return (
        x != null &&
        typeof x === "object" &&
        Object.prototype.toString.call(x) !== "[object Generator]" &&
        objectIterator(x)
    ) || undefined;
}
