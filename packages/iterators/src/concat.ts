import { iterator } from "./iterator";
import { ensureIterable } from "./ensure";

export function* concat<T>(...inputs: Iterable<T>[]) {
    let iter = iterator(inputs);
    let v: IteratorResult<Iterable<T>>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
