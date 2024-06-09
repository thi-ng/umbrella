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
export const edgeSplit: Tessellator = (tess, pids) => {
	const n = pids.length;
	const c = tess.points.length;
	const points = pids.map((i) => tess.points[i]);
	tess.points.push(centroid(points));
	for (let i = 0, n1 = n - 1; i < n; i++) {
		const j = i < n1 ? i + 1 : 0;
		const k = tess.points.push(addmN([], points[i], points[j], 0.5)) - 1;
		tess.indices.push([c, pids[i], k], [c, k, pids[j]]);
	}
	return tess;
};
