import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { addmN } from "@thi.ng/vectors/addmn";
import type { Tessellator } from "./api.js";

/**
 * Combined tessellator of {@link triFan}, followed by {@link rimTris}, but in a
 * single pass.
 *
 * @param points
 */
export const triFanSplit: Tessellator = (tess, pids) => {
	const faces: number[][] = [];
	const points = tess.pointsForIDs(pids);
	const c = centroid(points);
	const cid = tess.addPoint(c);
	const n = pids.length - 1;
	for (let i = 0; i <= n; i++) {
		const j = i < n ? i + 1 : 0;
		const a = points[i];
		const b = points[j];
		const mab = tess.addPoint(addmN([], a, b, 0.5));
		const mac = tess.addPoint(addmN([], a, c, 0.5));
		const mbc = tess.addPoint(addmN([], b, c, 0.5));
		faces.push(
			[pids[i], mab, mac],
			[mab, pids[j], mbc],
			[mac, mab, mbc],
			[mac, mbc, cid]
		);
	}
	return faces;
};
