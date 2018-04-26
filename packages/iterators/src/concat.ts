import { ensureIterable } from "./ensure";
import { iterator } from "./iterator";

export function* concat<T>(...inputs: Iterable<T>[]) {
    let iter = iterator(inputs);
    let v: IteratorResult<Iterable<T>>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
