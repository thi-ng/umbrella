import consume from "./consume";
import { ensureIterator } from "./ensure";

export default function* drop<T>(n: number, input: Iterable<T>) {
    let iter = ensureIterator(input);
    consume(iter, n);
    yield* iter;
}
