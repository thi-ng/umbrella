import { iterator } from "./iterator";

export function every<T>(pred: (x: T) => boolean, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>,
        empty = true;
    while (((v = iter.next()), !v.done)) {
        if (pred(v.value) !== true) {
            return false;
        }
        empty = false;
    }
    return !empty;
}
