import type { SortOpts, Transducer } from "../api";
import { comp } from "../func/comp";
import { __sortOpts } from "../internal/sort-opts";
import { $iter } from "../iterator";
import { map } from "./map";
import { partition } from "./partition";

/**
 * Transducer. Similar to {@link (movingAverage:1)}, but yields median
 * of sliding window and supports non-numeric inputs.
 *
 * @remarks
 * The optional `key` and `cmp` function options can be used to select /
 * compute a sortable value and change sorting behavior.
 *
 * @param n - window size
 * @param opts -
 * @param src -
 */
// prettier-ignore
export function movingMedian<A, B>(n: number, opts?: Partial<SortOpts<A, B>>): Transducer<A, A>;
// prettier-ignore
export function movingMedian<A, B>(n: number, src: Iterable<A>): IterableIterator<A>;
// prettier-ignore
export function movingMedian<A, B>(n: number, opts: Partial<SortOpts<A, B>>, src: Iterable<A>): IterableIterator<A>;
export function movingMedian<A, B>(...args: any[]): any {
    const iter = $iter(movingMedian, args);
    if (iter) {
        return iter;
    }
    const { key, compare } = __sortOpts<A, B>(args[1]);
    const n = args[0];
    const m = n >> 1;
    return comp<A, A[], A>(
        partition(n, 1, true),
        map(
            (window: A[]) =>
                window.slice().sort((a, b) => compare(key(a), key(b)))[m]
        )
    );
}
