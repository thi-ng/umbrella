import type { Fn2 } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export type Tessellator = Fn2<Tessellation, number[], Tessellation>;

export interface Tessellation {
	/**
	 * Points referenced by {@link Tessellation.indices}.
	 *
	 * @remarks
	 * If a {@link Tessellator} is creating new points as part of its
	 * processing, these are to be appended to this array.
	 */
	points: ReadonlyVec[];
	/**
	 * Array of per-face point IDs/indices, referencing
	 * {@link Tessellation.points}.
	 */
	indices: number[][];
}
