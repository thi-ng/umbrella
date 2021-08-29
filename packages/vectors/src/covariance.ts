import type { ReadonlyVec } from "./api";
import { center } from "./center";
import { mul } from "./mul";
import { sum } from "./sum";

/**
 * Computes the covariance coefficient between the two given vectors.
 *
 * @remarks
 * References:
 * - https://en.wikipedia.org/wiki/Covariance
 * - https://www.youtube.com/watch?v=2bcmklvrXTQ
 *
 * @param a
 * @param b
 */
export const covariance = (a: ReadonlyVec, b: ReadonlyVec) =>
    sum(mul(null, center([], a), center([], b))) / (a.length - 1);
