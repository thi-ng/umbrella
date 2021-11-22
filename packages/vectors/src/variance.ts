import type { ReadonlyVec } from "./api.js";
import { center } from "./center.js";
import { magSq } from "./magsq.js";

/**
 * Computes variance of vector components in `a`. If `isCentered` is
 * false (default), the vector will first be {@link center}ed (copy) in order to
 * compute the result.
 *
 * @remarks
 * var(a) = magSq(a) / (len(a)-1)). Returns 0 if len(a) < 2
 *
 * @param a
 * @param isCentered
 */
export const variance = (a: ReadonlyVec, isCentered = false) =>
    a.length > 1 ? magSq(isCentered ? a : center([], a)) / (a.length - 1) : 0;

/**
 * Computes standard deviation of vector components in `a`. If `isCentered` is
 * false (default), the vector will first be {@link center}ed (copy) in order to
 * compute the result.
 *
 * @remarks
 * sd = sqrt(var(a)). Returns 0 if len(a) < 2
 *
 * @param a
 * @param isCentered
 */
export const sd = (a: ReadonlyVec, isCentered = false) =>
    Math.sqrt(variance(a, isCentered));
