import { iterator } from "./iterator";

export const last = <T>(input: Iterable<T>) => {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    let prev: T;
    while (((v = iter.next()), !v.done)) {
        prev = v.value;
    }
    return prev;
};
