import { ensureIterable } from "./ensure";
import { iterator } from "./iterator";

export function* concat<T>(...inputs: (Iterable<T> | undefined | null)[]) {
    let iter = iterator(inputs);
    let v: IteratorResult<Iterable<T> | undefined | null>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
