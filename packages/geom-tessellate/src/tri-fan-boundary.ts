import type { Tessellator } from "./api.js";

export const triFanBoundary: Tessellator = (_, faces, pids) => {
	const c = pids[0];
	const n = pids.length - 1;
	for (let i = 1; i < n; i++) {
		faces.push([c, pids[i], pids[i + 1]]);
	}
	return faces;
};
