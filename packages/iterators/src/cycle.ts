import { iterator } from "./iterator";

export function* cycle<T>(input: Iterable<T>) {
    let cache: T[] = [],
        iter = iterator(input),
        v: IteratorResult<T>;
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
