import { mix } from "@thi.ng/math";
import type { Transducer } from "../api";
import { interpolate } from "./interpolate";

/**
 * Pre-configured version of {@link (interpolate:1)} for numeric values
 * and using pairwise linear interpolation.
 *
 * @remarks
 * The number of samples per interval is configurable. No values will be
 * produced if there're less than 2 inputs.
 *
 * See also:
 * - {@link (interpolate:1)}
 * - {@link (interpolateHermite:1)}
 *
 * @param n -
 */
export function interpolateLinear(n: number): Transducer<number, number>;
// prettier-ignore
export function interpolateLinear(n: number, src: Iterable<number>): IterableIterator<number>;
export function interpolateLinear(n: number, src?: Iterable<number>): any {
    return interpolate<number>(
        (chunk, t) => (<any>mix)(...chunk, t),
        2,
        n,
        src!
    );
}
