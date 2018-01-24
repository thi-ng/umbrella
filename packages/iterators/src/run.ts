import iterator from "./iterator";

export default function run<T>(fn: (x: T) => any, input: Iterable<T>) {
    let iter = iterator(input),
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        fn(v.value);
    }
}
