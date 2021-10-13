import { iterator } from "./iterator.js";

export const last = <T>(input: Iterable<T>) => {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    let prev: T | undefined;
    while (((v = iter.next()), !v.done)) {
        prev = v.value;
    }
    return prev;
};
