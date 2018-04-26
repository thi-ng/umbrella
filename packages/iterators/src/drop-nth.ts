import { ensureIterable } from "./ensure";
import { iterator } from "./iterator";
import { take } from "./take";

export function* dropNth<T>(n: number, input: Iterable<T>) {
    let iter = ensureIterable(iterator(input));
    do {
        yield* take(n - 1, iter);
    } while (!iter.next().done);
}
