import { ReadonlyVec, Vec } from "./api";
import { direction } from "./direction";
import { perpendicularLeft2, perpendicularRight2 } from "./perpendicular";

/**
 * Computes 2D normal by rotating direction vector `a` -> `b`, 90 deg
 * counterclockwise, normalized to length `n` (default: 1). If `out` is
 * null, creates new vector.
 *
 * @param out
 * @param a
 * @param b
 * @param n
 */
export const normalLeft2 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularLeft2(null, direction(out || [], a, b, n));

/**
 * Computes 2D normal by rotating direction vector `a` -> `b`, 90 deg
 * clockwise, normalized to length `n` (default: 1). If `out` is null,
 * creates new vector.
 *
 * @param out
 * @param a
 * @param b
 * @param n
 */
export const normalRight2 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularRight2(null, direction(out || [], a, b, n));
