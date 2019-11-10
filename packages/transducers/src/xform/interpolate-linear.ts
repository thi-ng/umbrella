import { mix } from "@thi.ng/math";
import { Transducer } from "../api";
import { interpolate } from "./interpolate";

/**
 * Pre-configured version of `interpolate()` for numeric values and
 * using pairwise linear interpolation. The number of samples per
 * interval is configurable. No values will be produced if there're less
 * than 2 inputs.
 *
 * @see interpolate
 * @see interpolateHermit
 *
 * @param n
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
