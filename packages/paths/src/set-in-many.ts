import type { Path } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { setIn } from "./set-in";

/**
 * Similar to {@link setInUnsafe}, but takes any number of path-value
 * pairs as args and applies them in sequence by calling `setIn()` for
 * each.
 *
 * @remarks
 * Any intermediate key paths missing in the data structure will be
 * created. Does NOT mutate original (instead use
 * {@link mutInManyUnsafe} for this purpose).
 *
 * The type parameter `T` can be used to indicate the type of the
 * overall state value and will also be used as return type.
 *
 * @example
 * ```ts
 * setInManyUnsafe(
 *   {},
 *   // pair #1
 *   "a.b", 10,
 *   // pair #2
 *   "x.y.z", 20
 * );
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state -
 * @param pairs -
 */
export function setInManyUnsafe<T>(state: T, p1: Path, v1: any): T;
export function setInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any
): T;
export function setInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any,
    p3: Path,
    v3: any
): T;
export function setInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any,
    p3: Path,
    v3: any,
    p4: Path,
    v4: any
): T;
export function setInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any,
    p3: Path,
    v3: any,
    p4: Path,
    v4: any,
    ...xs: any[]
): T;
export function setInManyUnsafe<T>(state: T, ...pairs: any[]) {
    const n = pairs.length;
    n & 1 &&
        illegalArgs(`require even number of KV args (got ${pairs.length})`);
    for (let i = 0; i < n; i += 2) {
        state = setIn(state, pairs[i], pairs[i + 1]);
    }
    return state;
}
