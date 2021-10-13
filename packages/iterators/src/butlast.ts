import { iterator } from "./iterator.js";

export function* butLast<T>(input: Iterable<T>) {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    let prev: T;
    let first = true;
    while (((v = iter.next()), !v.done)) {
        if (!first) {
            yield prev!;
        }
        prev = v.value;
        first = false;
    }
}
