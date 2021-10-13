import { iterator } from "./iterator.js";

export function* randomSample<T>(prob: number, input: Iterable<T>) {
    let iter = iterator(input);
    let random = Math.random;
    let v: IteratorResult<T>;
    while (((v = iter.next()), !v.done)) {
        if (random() < prob) {
            yield v.value;
        }
    }
}
