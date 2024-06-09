import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { Tessellator } from "./api.js";

export const triFan: Tessellator = (tess, pids) => {
	const n = pids.length - 1;
	const c = tess.points.length;
	tess.points.push(centroid(pids.map((i) => tess.points[i])));
	for (let i = 0; i <= n; i++) {
		tess.indices.push([c, pids[i], pids[i < n ? i + 1 : 0]]);
	}
	return tess;
};
