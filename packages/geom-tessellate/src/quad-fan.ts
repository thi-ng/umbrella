import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { addmN } from "@thi.ng/vectors";
import type { Tessellator } from "./api.js";

export const quadFan: Tessellator = (tess, faces, pids) => {
	const points = tess.pointsForIDs(pids);
	const c = tess.addPoint(centroid(points));
	const n = pids.length - 1;
	let m0 = tess.addPoint(addmN([], points[n], points[0], 0.5));
	let mprev = m0;
	for (let i = 0; i <= n; i++) {
		const m =
			i < n
				? tess.addPoint(addmN([], points[i], points[i + 1], 0.5))
				: m0;
		faces.push([c, mprev, pids[i], m]);
		mprev = m;
	}
	return faces;
};
