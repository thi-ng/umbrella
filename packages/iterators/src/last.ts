import { iterator } from "./iterator";

export function last<T>(input: Iterable<T>) {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    let prev: T;
    while (((v = iter.next()), !v.done)) {
        prev = v.value;
    }
    return prev;
}
