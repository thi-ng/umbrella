import type { Fn } from "@thi.ng/api";
import { iterator } from "./iterator";

export const run = <T>(fn: Fn<T, any>, input: Iterable<T>) => {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        fn(v.value);
    }
};
