// SPDX-License-Identifier: Apache-2.0
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { addmN } from "@thi.ng/vectors/addmn";
import type { Tessellator } from "./api.js";

/**
 * Tessellates a polygon into sequence of triangles by splitting each boundary
 * edge and constructing 2 triangles: `amc`, `mbc`, where `a` and `b` are edge
 * endpoints, `m` is the edge centroid and `c` the face centroid.
 *
 * @param points
 */
export const edgeSplit: Tessellator = (tess, faces, pids) => {
	const points = tess.pointsForIDs(pids);
	const c = tess.addPoint(centroid(points));
	const n = pids.length - 1;
	for (let i = 0; i <= n; i++) {
		const j = i < n ? i + 1 : 0;
		const m = tess.addPoint(addmN([], points[i], points[j], 0.5));
		faces.push([c, pids[i], m], [c, m, pids[j]]);
	}
	return faces;
};
