import { iterator } from "./iterator.js";

export function* take<T>(n: number, input: Iterable<T>) {
    let iter = iterator(input);
    while (n-- > 0) {
        let v = iter.next();
        if (v.done) {
            break;
        }
        yield v.value;
    }
}
