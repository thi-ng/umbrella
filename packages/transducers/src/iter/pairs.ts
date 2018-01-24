export function* pairs(x: any): IterableIterator<[string, any]> {
    for (let k of Object.keys(x)) {
        yield [k, x[k]];
    }
}
