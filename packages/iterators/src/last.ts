import iterator from "./iterator";

export default function last<T>(input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>,
        prev: T;
    while (((v = iter.next()), !v.done)) {
        prev = v.value;
    }
    return prev;
}
