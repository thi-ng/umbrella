import type { Fn } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export function* partitionBy<T>(fn: Fn<T, any>, input: Iterable<T>) {
    let iter = iterator(input);
    let chunk: T[] = [];
    let v: IteratorResult<T>;
    let prev;
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
