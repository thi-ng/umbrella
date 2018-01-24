import { ensureIterator } from "./ensure";

export default function* dropWhile<T>(pred: (x: T) => boolean, input: Iterable<T>) {
    let iter = ensureIterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done && pred(v.value) === true)) { }
    if (v.value !== undefined) {
        yield v.value;
        yield* iter;
    }
}
