import { iterator } from "./iterator";

export function* dedupeWith<T>(equiv: (a: T, b: T) => boolean, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>,
        prev: T;
    while (((v = iter.next()), !v.done)) {
        if (prev === undefined || !equiv(prev, v.value)) {
            prev = v.value;
            yield v.value;
        }
    }
}
