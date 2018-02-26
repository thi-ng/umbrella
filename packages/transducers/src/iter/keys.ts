export function* keys(x: any): IterableIterator<string> {
    for (let k in x) {
        if (x.hasOwnProperty(k)) {
            yield k;
        }
    }
}
