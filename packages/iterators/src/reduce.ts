import { iterator } from "./iterator";

export class ReducedValue<T> {
    public value: T;

    constructor(v: T) {
        this.value = v;
    }
}

export function reduce<A, B>(rfn: (acc: B, x: A) => B | ReducedValue<B>, acc: B, input: Iterable<A>) {
    let iter = iterator(input),
        v: IteratorResult<A>,
        _acc: B | ReducedValue<B> = acc;
    while (((v = iter.next()), !v.done)) {
        _acc = rfn(_acc as B, v.value);
        if (_acc instanceof ReducedValue) {
            return _acc.value;
        }
    }
    return _acc;
}

export function reduced<T>(x: T) {
    return new ReducedValue(x);
}
