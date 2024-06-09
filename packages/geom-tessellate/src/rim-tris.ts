import { range } from "@thi.ng/transducers/range";
import { addmN } from "@thi.ng/vectors/addmn";
import type { Tessellator } from "./api.js";

export const rimTris: Tessellator = (tess, pids) => {
	const n = pids.length - 1;
	const m = tess.points.length - 1;
	const points = pids.map((i) => tess.points[i]);
	for (let i = 0; i <= n; i++) {
		const j = i < n ? i + 1 : 0;
		const k = tess.points.push(addmN([], points[i], points[j], 0.5)) - 1;
		tess.indices.push([pids[i], k, i > 0 ? m + i : m + n + 1]);
	}
	tess.indices.push([...range(m + 1, m + n + 2)]);
	return tess;
};
