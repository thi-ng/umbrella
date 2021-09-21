import type { ReadonlyVec } from "@thi.ng/vectors";
import { neg } from "@thi.ng/vectors/neg";
import type { Mat } from "./api";
import { concat } from "./concat";
import { scale23, scale44 } from "./scale";
import { translation23, translation44 } from "./translation";

/**
 * Computes a 2x3 matrix representing a scale operation with origin `p`
 * and writes result to `out`.
 *
 * @param out -
 * @param m -
 */
export const scaleWithCenter23 = (
    m: Mat | null,
    p: ReadonlyVec,
    s: number | ReadonlyVec
) =>
    concat(
        m,
        translation23([], p),
        scale23([], s),
        translation23([], neg([], p))
    );

/**
 * Computes a 4x4 matrix representing a scale operation with origin `p`
 * and writes result to `out`.
 *
 * @param out -
 * @param m -
 */
export const scaleWithCenter44 = (
    m: Mat | null,
    p: ReadonlyVec,
    s: number | ReadonlyVec
) =>
    concat(
        m,
        translation44([], p),
        scale44([], s),
        translation44([], neg([], p))
    );
