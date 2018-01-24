import iterator from "./iterator";

export default function* partitionBy<T>(fn: (x: T) => any, input: Iterable<T>) {
    let iter = iterator(input),
        chunk: T[] = [],
        v: IteratorResult<T>,
        prev;
    while (((v = iter.next()), !v.done)) {
        let curr = fn(v.value);
        if (prev !== undefined && prev !== curr) {
            yield chunk;
            chunk = [];
        }
        prev = curr;
        chunk.push(v.value);
    }
    if (chunk.length > 0) {
        yield chunk;
    }
}
