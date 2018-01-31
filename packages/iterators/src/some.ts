import { Predicate } from "@thi.ng/api/api";

import { iterator } from "./iterator";

export function some<T>(pred: Predicate<T>, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (pred(v.value) === true) {
            return v.value;
        }
    }
}
