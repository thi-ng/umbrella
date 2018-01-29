import { iterator } from "./iterator";

export function* randomSample<T>(prob: number, input: Iterable<T>) {
    let iter = iterator(input),
        random = Math.random,
        v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (random() < prob) {
            yield v.value;
        }
    }
}
