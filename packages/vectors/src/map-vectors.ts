import type {
    ReadonlyVec,
    VecOpVV,
    Vec,
    VecOpVN,
    VecOpVVV,
    VecOpVVN,
} from "./api";
import { isNumber } from "@thi.ng/checks/is-number";

/**
 * Takes a vec op `fn`, output array (or null) and a combination of the
 * following inputs:
 *
 * - 2 arrays of vectors
 * - 1 array of vectors & 1 scalar
 * - 3 arrays of vectors
 * - 2 arrays of vectors & 1 scalar
 *
 * Then applies `fn` to each input and writes result into output array,
 * returns `out` (or new array if `out` was given as null).
 *
 * @example
 * ```ts
 * mapVectors(addN2, [], [[1, 2], [10, 20]], 100)
 * // [ [ 101, 102 ], [ 110, 120 ] ]
 *
 * mapVectors(add2, [], [[1, 2], [10, 20]], [[100,200],[1000,2000]])
 * // [ [ 101, 202 ], [ 1010, 2020 ] ]
 *
 * mapVectors(mixN2, null, [[1,2],[100,200]], [[10,20],[1000,2000]], 0.5)
 * // [ [ 5.5, 11 ], [ 550, 1100 ] ]
 * ```
 *
 * @param fn
 * @param out
 * @param a
 * @param b
 * @param c
 */
export function mapVectors(
    fn: VecOpVV,
    out: Vec[] | null,
    a: ReadonlyVec[],
    b: ReadonlyVec[]
): Vec[];
export function mapVectors(
    fn: VecOpVN,
    out: Vec[] | null,
    a: ReadonlyVec[],
    n: number
): Vec[];
export function mapVectors(
    fn: VecOpVVV,
    out: Vec[] | null,
    a: ReadonlyVec[],
    b: ReadonlyVec[],
    c: ReadonlyVec[]
): Vec[];
export function mapVectors(
    fn: VecOpVVN,
    out: Vec[] | null,
    a: ReadonlyVec[],
    b: ReadonlyVec[],
    c: number
): Vec[];
export function mapVectors(
    fn: VecOpVV | VecOpVN | VecOpVVV | VecOpVVN,
    out: Vec[] | null,
    a: ReadonlyVec[],
    b: ReadonlyVec[] | number,
    c?: ReadonlyVec[] | number
): Vec[] {
    const num = a.length;
    !out && (out = new Array(num));
    if (c !== undefined) {
        if (isNumber(c)) {
            for (let i = 0; i < num; i++) {
                out[i] = (<VecOpVVN>fn)(
                    out[i] || [],
                    a[i],
                    (<ReadonlyVec[]>b)[i],
                    c
                );
            }
        } else {
            for (let i = 0; i < num; i++) {
                out[i] = (<VecOpVVV>fn)(
                    out[i] || [],
                    a[i],
                    (<ReadonlyVec[]>b)[i],
                    c[i]
                );
            }
        }
    } else {
        if (isNumber(b)) {
            for (let i = 0; i < num; i++) {
                out[i] = (<VecOpVN>fn)(out[i] || [], a[i], b);
            }
        } else {
            for (let i = 0; i < num; i++) {
                out[i] = (<VecOpVV>fn)(out[i] || [], a[i], b[i]);
            }
        }
    }
    return out;
}
