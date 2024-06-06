import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { addmN } from "@thi.ng/vectors";

export const quadFan: Tessellator = (tess, pids) => {
	const n = pids.length;
	const n1 = n - 1;
	const c = tess.points.length;
	const p2 = c + 1;
	const p3 = c + n;
	const points = pids.map((i) => tess.points[i]);
	tess.points.push(centroid(points));
	for (let i = 0; i < n; i++) {
		tess.points.push(addmN([], points[i], points[i < n1 ? i + 1 : 0], 0.5));
		tess.indices.push([
			c,
			i > 0 ? c + i : p3,
			pids[i],
			i < n1 ? p2 + i : p3,
		]);
	}
	return tess;
};
