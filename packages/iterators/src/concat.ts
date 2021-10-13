import { ensureIterable } from "./ensure.js";
import { iterator } from "./iterator.js";

export function* concat<T>(...inputs: (Iterable<T> | undefined | null)[]) {
    let iter = iterator(inputs);
    let v: IteratorResult<Iterable<T> | undefined | null>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
