import { ensureIterable } from "../func/ensure-iterable";

export function* concat<T>(...inputs: Iterable<T>[]) {
    let iter = inputs[Symbol.iterator](),
        v: IteratorResult<Iterable<T>>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
