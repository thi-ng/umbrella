export function ensureIterable(x: any): IterableIterator<any> {
    if (!(x != null && x[Symbol.iterator])) {
        throw new Error(`value is not iterable: ${x}`);
    }
    return x;
}
