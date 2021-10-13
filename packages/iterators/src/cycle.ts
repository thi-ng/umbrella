import { iterator } from "./iterator.js";

export function* cycle<T>(input: Iterable<T>) {
    let cache: T[] = [];
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        cache.push(v.value);
        yield v.value;
    }
    if (cache.length > 0) {
        while (true) {
            yield* cache;
        }
    }
}
