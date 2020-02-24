import { iterator } from "./iterator";
import type { Fn } from "@thi.ng/api";

export const run = <T>(fn: Fn<T, any>, input: Iterable<T>) => {
    let iter = iterator(input);
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        fn(v.value);
    }
};
