import consume from "./consume";
import iterator from "./iterator";

export default function* takeNth<T>(n: number, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        yield v.value;
        consume(iter, n - 1);
    }
}
