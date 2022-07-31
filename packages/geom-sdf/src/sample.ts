import type { Fn, NumericArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { AABBLike } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { SDFn } from "./api.js";

/**
 * Samples and discretizes the given SDF within the given bounding rect and
 * resolution. The optional `domain` fn can be used to apply modifiers to each
 * sample position. If `buf` is provided, writes results into it, else creates a
 * new buffer automatically. Returns buffer.
 *
 * @param sdf
 * @param bounds
 * @param res
 * @param domain
 * @param buf
 */
export const sample2d = (
	sdf: SDFn,
	{ pos: [px, py], size: [width, height] }: AABBLike,
	[resX, resY]: ReadonlyVec,
	domain?: Fn<ReadonlyVec, Vec>,
	buf?: NumericArray
) => {
	if (buf) {
		assert(buf.length >= resX * resY, "insufficient buffer size");
	} else {
		buf = new Float32Array(resX * resY);
	}
	const dx = width / (resX - 1);
	const dy = height / (resY - 1);
	const p = [0, 0];
	for (let y = 0, i = 0; y < resY; y++) {
		p[1] = py + y * dy;
		for (let x = 0; x < resX; x++, i++) {
			p[0] = px + x * dx;
			buf[i] = sdf(domain ? domain(p) : p);
		}
	}
	return buf;
};
