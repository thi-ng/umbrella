import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { mixN } from "@thi.ng/vectors/mixn";
import type { Tessellator } from "./api.js";

export const inset =
	(inset = 0.5, keepInterior = false): Tessellator =>
	(tess, faces, pids) => {
		const points = tess.pointsForIDs(pids);
		const c = centroid(points);
		const insets = tess.addPoints(points.map((p) => mixN([], p, c, inset)));
		const n = pids.length - 1;
		for (let i = 0; i <= n; i++) {
			const j = i < n ? i + 1 : 0;
			faces.push([pids[i], pids[j], insets[j], insets[i]]);
		}
		if (keepInterior) faces.push(insets);
		return faces;
	};
