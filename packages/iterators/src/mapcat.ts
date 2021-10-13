import { ensureIterable } from "./ensure.js";
import { map } from "./map.js";

export function* mapcat<T>(
    fn: (...args: any[]) => Iterable<T> | undefined | null,
    ...inputs: Iterable<any>[]
): IterableIterator<T> {
    (<any>inputs).unshift(fn);
    let iter = <IterableIterator<Iterable<T>>>map.apply(null, <any>inputs);
    let v: IteratorResult<Iterable<T>>;
    while (((v = iter.next()), !v.done)) {
        if (v.value != null) {
            yield* ensureIterable(v.value);
        }
    }
}
