import iterator from "./iterator";

export default function* butLast<T>(input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>,
        prev: T,
        first = true;
    while (((v = iter.next()), !v.done)) {
        if (!first) { yield prev; }
        prev = v.value;
        first = false;
    }
}
