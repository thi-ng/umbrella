// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors/assert";
import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { mixBilinear } from "@thi.ng/vectors/mix-bilinear";
import { BPatch } from "./api/bpatch.js";

/**
 * Creates a new {@link BPatch} shape instance for given 16 control points (see
 * class docs for point order).
 *
 * @param pts
 * @param attribs
 */
export const bpatch = (pts: Iterable<Vec>, attribs?: Attribs) =>
	new BPatch(pts, attribs);

/**
 * Creates a new {@link BPatch} shape instance from given 4 corner points.
 *
 * @param pts
 * @param attribs
 */
export const bpatchFromQuad = (pts: Vec[], attribs?: Attribs) => {
	assert(pts.length === 4, "require 4 points");
	const [a, b, c, d] = pts;
	const cps = [];
	for (let u = 0; u < 4; u++) {
		for (let v = 0; v < 4; v++) {
			cps.push(mixBilinear([], a, b, d, c, u / 3, v / 3));
		}
	}
	return new BPatch(cps, attribs);
};

/**
 * Creates a new {@link BPatch} shape instance from the given 6 corner points of
 * a hexagon.
 *
 * @example
 * ```ts tangle:../export/bpatch-from-hex.ts
 * import { bpatchFromHex, star }
 * ```
 *
 * @param pts
 * @param attribs
 */
export const bpatchFromHex = (pts: Vec[], attribs?: Attribs) => {
	assert(pts.length === 6, "require 6 points");
	const [a, b, c, d, e, f] = pts;
	return new BPatch(
		[e, e, f, f, d, d, a, a, d, d, a, a, c, c, b, b],
		attribs
	);
};
