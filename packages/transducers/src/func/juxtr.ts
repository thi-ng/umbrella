import type { Reducer } from "../api";
import { isReduced, reduced, unreduced } from "../reduced";

/**
 * Composes a new reducer from the ones given, in order to produce
 * multiple reductions in parallel from the same input.
 *
 * @remarks
 * The returned reducer produces a result tuple of reduction results,
 * one per reducer. If any of the reducers returns a {@link reduced}
 * result, the reduction process stops for all others too. `juxtR`
 * produces optimized versions for up to 3 reducer args, but can support
 * any number of reducers.
 *
 * @example
 * ```ts
 * reduce(juxtR(add(), reductions(add()), str("-")), [1, 2, 3, 4]);
 * // [ 10, [ 0, 1, 3, 6, 10 ], '1-2-3-4' ]
 * ```
 */
export function juxtR<A1, B>(r1: Reducer<A1, B>): Reducer<[A1], B>;
export function juxtR<A1, A2, B>(
    r1: Reducer<A1, B>,
    r2: Reducer<A2, B>
): Reducer<[A1, A2], B>;
export function juxtR<A1, A2, A3, B>(
    r1: Reducer<A1, B>,
    r2: Reducer<A2, B>,
    r3: Reducer<A3, B>
): Reducer<[A1, A2, A3], B>;
export function juxtR<A1, A2, A3, B>(
    r1: Reducer<A1, B>,
    r2: Reducer<A2, B>,
    r3: Reducer<A3, B>,
    ...rs: Reducer<any, B>[]
): Reducer<any[], B>;
export function juxtR<B>(...rs: Reducer<any, B>[]): any {
    let [a, b, c] = rs;
    const n = rs.length;
    switch (n) {
        case 1: {
            const r = a[2];
            return <Reducer<any[], B>>[
                () => [a[0]()],
                (acc) => [a[1](acc[0])],
                (acc, x) => {
                    const aa1 = r(acc[0], x);
                    if (isReduced(aa1)) {
                        return reduced([unreduced(aa1)]);
                    }
                    return [aa1];
                },
            ];
        }
        case 2: {
            const ra = a[2];
            const rb = b[2];
            return <Reducer<any[], B>>[
                () => [a[0](), b[0]()],
                (acc) => [a[1](acc[0]), b[1](acc[1])],
                (acc, x) => {
                    const aa1 = ra(acc[0], x);
                    const aa2 = rb(acc[1], x);
                    if (isReduced(aa1) || isReduced(aa2)) {
                        return reduced([unreduced(aa1), unreduced(aa2)]);
                    }
                    return [aa1, aa2];
                },
            ];
        }
        case 3: {
            const ra = a[2];
            const rb = b[2];
            const rc = c[2];
            return <Reducer<any[], B>>[
                () => [a[0](), b[0](), c[0]()],
                (acc) => [a[1](acc[0]), b[1](acc[1]), c[1](acc[2])],
                (acc, x) => {
                    const aa1 = ra(acc[0], x);
                    const aa2 = rb(acc[1], x);
                    const aa3 = rc(acc[2], x);
                    if (isReduced(aa1) || isReduced(aa2) || isReduced(aa3)) {
                        return reduced([
                            unreduced(aa1),
                            unreduced(aa2),
                            unreduced(aa3),
                        ]);
                    }
                    return [aa1, aa2, aa3];
                },
            ];
        }
        default:
            return <Reducer<any[], B>>[
                () => rs.map((r) => r[0]()),
                (acc) => rs.map((r, i) => r[1](acc[i])),
                (acc, x) => {
                    let done = false;
                    const res = [];
                    for (let i = 0; i < n; i++) {
                        let a = rs[i][2](acc[i], x);
                        if (isReduced(a)) {
                            done = true;
                            a = unreduced(a);
                        }
                        res[i] = a;
                    }
                    return done ? reduced(res) : res;
                },
            ];
    }
}
