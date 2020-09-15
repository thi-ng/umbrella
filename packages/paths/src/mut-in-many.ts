import type { Path } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";
import { mutIn } from "./mut-in";

/**
 * Similar to {@link mutInUnsafe}, but takes any number of path-value
 * pairs as args and applies them in sequence using `mutInUnsafe()`.
 *
 * @remarks
 * All intermediate path keys must already be present in the given data
 * structure until their penultimate key. Missing leaf keys are
 * supported.
 *
 * The type parameter `T` can be used to indicate the type of the state
 * value and will also be used as return type.
 *
 * @example
 * ```ts
 * mutInManyUnsafe(
 *   { a: { b: 1 }, x: { y: { z: 2 } } },
 *   // pair #1
 *   "a.b", 10,
 *   // pair #2
 *   "x.y.z", 20
 * )
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state -
 * @param pairs -
 */
export function mutInManyUnsafe<T>(state: T, p1: Path, v1: any): T;
export function mutInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any
): T;
export function mutInManyUnsafe<T>(
    state: T,
    p1: Path,
    v1: any,
    p2: Path,
    v2: any,
    p3: Path,
    v3: any
): T;
export function mutInManyUnsafe<T>(
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
export function mutInManyUnsafe<T>(
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
export function mutInManyUnsafe<T>(state: T, ...pairs: any[]) {
    const n = pairs.length;
    n & 1 && illegalArgs(`require even number of args (got ${pairs.length})`);
    for (let i = 0; i < n && state; i += 2) {
        state = mutIn(state, pairs[i], pairs[i + 1]);
    }
    return state;
}
