// SPDX-License-Identifier: Apache-2.0
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { Tessellator } from "./api.js";

export const triFan: Tessellator = (tess, faces, pids) => {
	const c = tess.addPoint(centroid(tess.pointsForIDs(pids)));
	const n = pids.length - 1;
	for (let i = 0; i <= n; i++) {
		faces.push([c, pids[i], pids[i < n ? i + 1 : 0]]);
	}
	return faces;
};
