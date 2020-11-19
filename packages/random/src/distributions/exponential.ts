import type { IRandom } from "../api";
import { SYSTEM } from "../system";

/**
 * Higher order function. Returns no-arg function, yielding values in
 * exponential distribution based on given rate `lambda`.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Exponential_distribution
 *
 * @param rnd
 * @param lambda - event interval [0,Inf)
 */
export const exponential = (rnd: IRandom = SYSTEM, lambda = 10) => () =>
    lambda === 0 ? () => Infinity : -Math.log(1 - rnd.float(1)) / lambda;
