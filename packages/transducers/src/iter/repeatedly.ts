import { Fn0 } from "@thi.ng/api";

export function* repeatedly<T>(fn: Fn0<T>, n = Infinity): IterableIterator<T> {
    while (n-- > 0) {
        yield fn();
    }
}
