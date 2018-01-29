import { iterator } from "./iterator";

export function* takeWhile<T>(pred: (x: T) => boolean, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done && pred(v.value))) {
        yield v.value;
    }
}
