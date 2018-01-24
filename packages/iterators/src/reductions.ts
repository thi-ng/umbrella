import { ReducedValue } from "./reduce";
import iterator from "./iterator";

export default function* reductions<A, B>(rfn: (acc: B, x: A) => B | ReducedValue<B>, acc: B, input: Iterable<A>) {
    let iter = iterator(input),
        v: IteratorResult<A>,
        _acc: B | ReducedValue<B> = acc,
        empty = true;
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
