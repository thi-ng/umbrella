import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { range } from "@thi.ng/transducers/range";
import { mixN } from "@thi.ng/vectors/mixn";

export const inset =
	(inset = 0.5, keepInterior = false): Tessellator =>
	(tess, pids) => {
		const n = pids.length - 1;
		const m = tess.points.length;
		const points = pids.map((i) => tess.points[i]);
		const c = centroid(points);
		tess.points.push(...points.map((p) => mixN([], p, c, inset)));
		for (let i = 0; i <= n; i++) {
			const j = i < n ? i + 1 : 0;
			tess.indices.push([pids[i], pids[j], m + j, m + i]);
		}
		if (keepInterior) {
			tess.indices.push([...range(m, m + n + 1)]);
		}
		return tess;
	};
