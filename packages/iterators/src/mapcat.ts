import { ensureIterable } from "./ensure";
import { map } from "./map";

export function* mapcat<T>(
    fn: (...args: any[]) => Iterable<T>,
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
