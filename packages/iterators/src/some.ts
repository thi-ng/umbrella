import { iterator } from "./iterator";
import type { Predicate } from "@thi.ng/api";

export const some = <T>(pred: Predicate<T>, input: Iterable<T>) => {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (pred(v.value) === true) {
            return v.value;
        }
    }
};
