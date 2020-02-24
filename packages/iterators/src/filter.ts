import { iterator } from "./iterator";
import type { Predicate } from "@thi.ng/api";

export function* filter<T>(pred: Predicate<T>, input: Iterable<T>) {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (pred(v.value) === true) {
            yield v.value;
        }
    }
}
