import type { Fn2 } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export class ReducedValue<T> {
    public value: T;

    constructor(v: T) {
        this.value = v;
    }
}

export const reduce = <A, B>(
    rfn: Fn2<B, A, B | ReducedValue<B>>,
    acc: B,
    input: Iterable<A>
) => {
    let iter = iterator(input);
    let v: IteratorResult<A>;
    let _acc: B | ReducedValue<B> = acc;
    while (((v = iter.next()), !v.done)) {
        _acc = rfn(_acc as B, v.value);
        if (_acc instanceof ReducedValue) {
            return _acc.value;
        }
    }
    return _acc;
};

export const reduced = <T>(x: T) => new ReducedValue(x);
