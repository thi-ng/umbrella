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
	const n = pids.length;
	const points = pids.map((i) => tess.points[i]);
	const cid = tess.points.length;
	const c = centroid(points);
	tess.points.push(c);
	for (let i = 0, n1 = n - 1; i < n; i++) {
		const j = i < n1 ? i + 1 : 0;
		const a = points[i];
		const b = points[j];
		const mab = tess.points.push(addmN([], a, b, 0.5)) - 1;
		const mac = tess.points.push(addmN([], a, c, 0.5)) - 1;
		const mbc = tess.points.push(addmN([], b, c, 0.5)) - 1;
		tess.indices.push(
			[pids[i], mab, mac],
			[mab, pids[j], mbc],
			[mac, mab, mbc],
			[mac, mbc, cid]
		);
	}
	return tess;
};
