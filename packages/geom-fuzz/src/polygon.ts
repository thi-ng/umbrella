// SPDX-License-Identifier: Apache-2.0
import { asCubic } from "@thi.ng/geom/as-cubic";
import { group } from "@thi.ng/geom/group";
import { pathFromCubics } from "@thi.ng/geom/path-from-cubics";
import { polygon } from "@thi.ng/geom/polygon";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { FuzzyPolygonOpts } from "./api.js";
import { jitterPoints } from "./points.js";

export const fuzzyPoly = (
	pts: ReadonlyVec[],
	attribs = {},
	opts: Partial<FuzzyPolygonOpts> = {}
) => {
	opts = {
		num: 2,
		jitter: 2,
		...opts,
		curve: { mode: "break", ...opts.curve },
	};
	const acc = group(attribs, []);
	for (; --opts.num! >= 0; ) {
		const poly = polygon(jitterPoints(pts, opts.jitter));
		acc.children.push(pathFromCubics(asCubic(poly, opts.curve)));
		if (!opts.num && opts.fill) {
			acc.children.push(opts.fill(poly));
		}
	}
	return acc;
};
