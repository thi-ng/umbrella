// SPDX-License-Identifier: Apache-2.0
import { pointInTriangle2 } from "@thi.ng/geom-isec/point";
import { polyArea2 } from "@thi.ng/geom-poly-utils/area";
import { range } from "@thi.ng/transducers/range";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { signedArea2 } from "@thi.ng/vectors/signed-area";
import type { Tessellator } from "./api.js";

export const earCut: Tessellator = (tess, faces, pids) => {
	let n = pids.length;
	const points = tess.pointsForIDs(pids);
	const order = [
		...(polyArea2(points) > 0 ? range(n) : range(n - 1, -1, -1)),
	];
	let count = 2 * n - 1;
	let v = n - 1,
		u: number,
		w: number;
	while (count > 0 && n > 2) {
		u = n <= v ? 0 : v;
		v = u + 1;
		v = n <= v ? 0 : v;
		w = v + 1;
		w = n <= w ? 0 : w;
		if (__snip(points, u, v, w, n, order)) {
			faces.push([pids[order[u]], pids[order[v]], pids[order[w]]]);
			order.splice(v, 1);
			n--;
			count = 2 * n;
		} else {
			count--;
		}
	}
	return faces;
};

const __snip = (
	points: ReadonlyVec[],
	u: number,
	v: number,
	w: number,
	n: number,
	ids: number[]
) => {
	const a = points[ids[u]];
	const b = points[ids[v]];
	const c = points[ids[w]];
	if (signedArea2(a, b, c) > 0) {
		for (let i = 0; i < n; i++) {
			if (i !== u && i !== v && i !== w) {
				if (pointInTriangle2(points[ids[i]], a, b, c)) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
};
