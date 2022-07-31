import type { ReadonlyVec } from "@thi.ng/vectors";
import {
	distManhattan,
	distManhattan2,
	distManhattan3,
} from "@thi.ng/vectors/dist-manhattan";
import type { IDistance, Metric } from "./api.js";

/**
 * Manhattan distance metric and conversion to/from Eucledian distances.
 *
 * @remarks
 * The conversion are always based on n-D squares, i.e. the assumption that the
 * distance is equally shared in each dimension.
 *
 * E.g. a Manhattan distance of 30 could be obtained from [0,0] -> [10,20], but
 * would be interpreted here as distance from [0,0] -> [15,15], which produces
 * the same Manhattan value, but yields a different Eucledian result. For lack
 * of any other information about the distance values, this is however the only
 * way to approach conversion and is sufficient for the purposes of this
 * package...
 *
 * @example
 * ```ts
 * MANHATTAN2.metric([0,0], [10,20])
 * // 30
 *
 * MANHATTAN2.from(30);
 * // 21.213203435596427
 *
 * Math.hypot(15, 15) // <-- diagonal of manhattan square
 * // 21.213203435596427
 *
 * Math.hypot(10, 20) // <-- actual eucledian dist
 * // 22.360679774997898
 *
 * MANHATTAN2.to(21.213203435596427)
 * // 30
 *
 * // however, starting w/ eucledian dist first
 * e = mag([10, 20])
 * // 22.360679774997898
 *
 * m = MANHATTAN2.to(e)
 * // 31.622776601683793
 *
 * MANHATTAN2.from(m) === e
 * // true
 * ```
 */
export class Manhattan<T> implements IDistance<T> {
	protected _invD: number;

	constructor(
		public readonly dim: number,
		public readonly metric: Metric<T>
	) {
		this._invD = this.dim / Math.sqrt(dim);
	}

	to(x: number) {
		return x * this._invD;
	}

	from(x: number) {
		return Math.sqrt((x / this.dim) ** 2 * this.dim);
	}
}

/**
 * Returns a new Manhattan distance metric for n-D vectors of dimension `dim`.
 */
export const defManhattan = (dim: number) =>
	new Manhattan<ReadonlyVec>(dim, distManhattan);

/**
 * Manhattan distance metric for 2d vectors.
 */
export const MANHATTAN2 = new Manhattan<ReadonlyVec>(2, distManhattan2);

/**
 * Manhattan distance metric for 3d vectors.
 */
export const MANHATTAN3 = new Manhattan<ReadonlyVec>(3, distManhattan3);
