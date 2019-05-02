import { Crossing, EPS } from "./api";
import { eqDelta } from "./eqdelta";

/**
 * Returns true if line A rises up over B.
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 */
export const isCrossOver = (a1: number, a2: number, b1: number, b2: number) =>
    a1 < b1 && a2 > b2;

/**
 * Returns true if line A rises up over B.
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 */
export const isCrossUnder = (a1: number, a2: number, b1: number, b2: number) =>
    a1 > b1 && a2 < b2;

/**
 * Returns `Crossing` classifier indicating the relationship of line A
 * to line B. The optional epsilon value is used to determine if both
 * lines are considered equal or flat.
 *
 * @see isCrossUp
 * @see isCrossDown
 * @see Crossing
 *
 * @param a1
 * @param a2
 * @param b1
 * @param b2
 * @param eps
 */
export const classifyCrossing = (
    a1: number,
    a2: number,
    b1: number,
    b2: number,
    eps = EPS
) => {
    if (isCrossOver(a1, a2, b1, b2)) {
        return Crossing.OVER;
    } else if (isCrossUnder(a1, a2, b1, b2)) {
        return Crossing.UNDER;
    }
    return eqDelta(a1, b1, eps) && eqDelta(a2, b2, eps)
        ? eqDelta(a1, b2, eps)
            ? Crossing.FLAT
            : Crossing.EQUAL
        : Crossing.OTHER;
};
