import { Comparator } from "@thi.ng/api/api";
import { compare as cmp } from "@thi.ng/compare";

import { Fn, Transducer } from "../api";
import { comp } from "../func/comp";
import { identity } from "../func/identity";
import { $iter } from "../iterator";
import { map } from "./map";
import { partition } from "./partition";

export interface MovingMedianOpts<A, B> {
    key: Fn<A, B>;
    compare: Comparator<B>;
}

/**
 * Transducer. Similar to `movingAverage()`, but yields median of
 * sliding window and supports non-numeric inputs. The optional `key`
 * and `cmp` function args can be used to select / compute a sortable
 * value and change sorting behavior.
 *
 * @param n window size
 * @param opts
 * @param src
 */
export function movingMedian<A, B>(n: number, opts?: Partial<MovingMedianOpts<A, B>>): Transducer<A, A>;
export function movingMedian<A, B>(n: number, src: Iterable<A>): IterableIterator<A>;
export function movingMedian<A, B>(n: number, opts: Partial<MovingMedianOpts<A, B>>, src: Iterable<A>): IterableIterator<A>;
export function movingMedian<A, B>(...args: any[]): any {
    const iter = $iter(movingMedian, args);
    if (iter) {
        return iter;
    }
    const { key, compare } = <MovingMedianOpts<A, B>>{
        key: <any>identity,
        compare: cmp,
        ...args[1]
    };
    const n = args[0];
    const m = n >> 1;
    return comp(
        partition(n, 1, true),
        map((window: A[]) => window.slice().sort((a, b) => compare(key(a), key(b)))[m])
    );
}
