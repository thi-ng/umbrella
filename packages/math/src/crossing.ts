import type { FnU4 } from "@thi.ng/api";
import { Crossing, EPS } from "./api";
import { eqDelta } from "./eqdelta";

/**
 * Returns true if line A rises up over B.
 *
 * @example
 * ```ts
 * b1  a2
 *   \/
 *   /\
 * a1  b2
 * ```
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 */
export const isCrossOver: FnU4<number, boolean> = (a1, a2, b1, b2) =>
    a1 < b1 && a2 > b2;

/**
 * Returns true if line A rises up over B.
 *
 * @example
 * ```ts
 * a1  b2
 *   \/
 *   /\
 * b1  a2
 * ```
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 */
export const isCrossUnder: FnU4<number, boolean> = (a1, a2, b1, b2) =>
    a1 > b1 && a2 < b2;

/**
 * Returns {@link Crossing} classifier indicating the relationship of line A
 * to line B. The optional epsilon value is used to determine if both
 * lines are considered equal or flat.
 *
 * - {@link isCrossOver}
 * - {@link isCrossUnder}
 * - {@link Crossing}
 *
 * @param a1 -
 * @param a2 -
 * @param b1 -
 * @param b2 -
 * @param eps -
 */
export const classifyCrossing = (
    a1: number,
    a2: number,
    b1: number,
    b2: number,
    eps = EPS
): Crossing =>
    eqDelta(a1, b1, eps) && eqDelta(a2, b2, eps)
        ? eqDelta(a1, b2, eps)
            ? "flat"
            : "equal"
        : isCrossOver(a1, a2, b1, b2)
        ? "over"
        : isCrossUnder(a1, a2, b1, b2)
        ? "under"
        : "other";
