import type { IShape } from "@thi.ng/geom-api";
import { bounds2 } from "@thi.ng/geom-poly-utils/bounds";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import type { BPatch } from "./api/bpatch.js";
import type { Rect } from "./api/rect.js";
import { mapPoint } from "./map-point.js";
import { rectFromMinMax } from "./rect.js";
import { unmapPoint } from "./unmap-point.js";

/**
 * Transfers/remaps points (in world space) given in relation to `src` shape to
 * be relative to the space of `dest` shape. Writes results to `out` (or creates
 * new array).
 *
 * @remarks
 * The type of `src` must be supported by {@link mapPoint}. The type of `dest`
 * must be supported by {@link unmapPoint}.
 *
 * @param pts
 * @param dest
 * @param src
 * @param out
 */
export const warpPoints = (
	pts: ReadonlyVec[],
	dest: IShape,
	src: IShape,
	out: Vec[] = []
) => {
	for (let n = pts.length, i = 0; i < n; i++) {
		out.push(unmapPoint(dest, mapPoint(src, pts[i])));
	}
	return out;
};

export const warpPointsBPatch = (
	pts: ReadonlyVec[],
	dest: BPatch,
	src?: Rect,
	out: Vec[] = []
) => {
	src = src || rectFromMinMax(...bounds2(pts));
	for (let i = pts.length; i-- > 0; ) {
		out[i] = dest.unmapPoint(mapPoint(src, pts[i]));
	}
	return out;
};
