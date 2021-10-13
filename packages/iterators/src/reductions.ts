import type { Fn2 } from "@thi.ng/api";
import { iterator } from "./iterator.js";
import { ReducedValue } from "./reduce.js";

export function* reductions<A, B>(
    rfn: Fn2<B, A, B | ReducedValue<B>>,
    acc: B,
    input: Iterable<A>
) {
    let iter = iterator(input);
    let v: IteratorResult<A>;
    let _acc: B | ReducedValue<B> = acc;
    let empty = true;
    while (((v = iter.next()), !v.done)) {
        _acc = rfn(_acc as B, v.value);
        if (_acc instanceof ReducedValue) {
            yield _acc.value;
            return;
        }
        yield _acc;
        empty = false;
    }
    if (empty) {
        yield _acc;
    }
}
