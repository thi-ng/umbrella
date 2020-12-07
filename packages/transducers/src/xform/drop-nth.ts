import { isIterable } from "@thi.ng/checks";
import type { Transducer } from "../api";
import { iterator1 } from "../iterator";
import { throttle } from "./throttle";

export function dropNth<T>(n: number): Transducer<T, T>;
export function dropNth<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function dropNth<T>(n: number, src?: Iterable<T>): any {
    if (isIterable(src)) {
        return iterator1(dropNth(n), src);
    }
    n = Math.max(0, n - 1);
    return throttle(() => {
        let skip = n;
        return () => (skip-- > 0 ? true : ((skip = n), false));
    });
}
