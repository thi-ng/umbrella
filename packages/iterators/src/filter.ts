import { iterator } from "./iterator";

export function* filter<T>(pred: (x: T) => boolean, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (pred(v.value) === true) {
            yield v.value;
        }
    }
}
