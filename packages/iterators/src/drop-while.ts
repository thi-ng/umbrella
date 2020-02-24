import { ensureIterator } from "./ensure";
import type { Predicate } from "@thi.ng/api";

export function* dropWhile<T>(pred: Predicate<T>, input: Iterable<T>) {
    let iter = ensureIterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done && pred(v.value) === true)) {}
    if (v.value !== undefined) {
        yield v.value;
        yield* iter;
    }
}
