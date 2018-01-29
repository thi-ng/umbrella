import { iterator } from "./iterator";

export function ensureIterable(x: any): IterableIterator<any> {
    if (!(x != null && x[Symbol.iterator])) {
        throw new Error(`value is not iterable: ${x}`);
    }
    return x;
}

export function ensureIterator(x: any) {
    return ensureIterable(iterator(x));
}
