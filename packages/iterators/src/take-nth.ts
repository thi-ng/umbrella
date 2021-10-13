import { consume } from "./consume.js";
import { iterator } from "./iterator.js";

export function* takeNth<T>(n: number, input: Iterable<T>) {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        yield v.value;
        consume(iter, n - 1);
    }
}
