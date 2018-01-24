import iterator from "./iterator";

export default function* takeLast<T>(n: number, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>,
        prev: T[] = [];
    while (((v = iter.next()), !v.done)) {
        prev.push(v.value);
        if (prev.length > n) {
            prev = prev.slice(1);
        }
    }
    yield* prev;
}
