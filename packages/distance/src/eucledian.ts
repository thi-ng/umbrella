import type { ReadonlyVec } from "@thi.ng/vectors";
import { dist, dist2, dist3 } from "@thi.ng/vectors/dist";
import type { IDistance, Metric } from "./api.js";

export class Eucledian<T> implements IDistance<T> {
	constructor(public readonly metric: Metric<T>) {}

	to(x: number) {
		return x;
	}

	from(x: number) {
		return x;
	}
}

/**
 * Eucledian distance metric for n-D vectors.
 */
export const EUCLEDIAN = new Eucledian<ReadonlyVec>(dist);

/**
 * Eucledian distance metric for numbers.
 */
export const EUCLEDIAN1 = new Eucledian<number>((a, b) => Math.abs(a - b));

/**
 * Eucledian distance metric for 2d vectors.
 */
export const EUCLEDIAN2 = new Eucledian<ReadonlyVec>(dist2);

/**
 * Eucledian distance metric for 3d vectors.
 */
export const EUCLEDIAN3 = new Eucledian<ReadonlyVec>(dist3);
