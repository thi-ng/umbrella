// SPDX-License-Identifier: Apache-2.0
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { writeText } from "@thi.ng/file-io";
import { asSvg, group, points, polygon, polyline, svgDoc } from "@thi.ng/geom";
import { iterate, mapIndexed, pairs } from "@thi.ng/transducers";
import { ReadonlyVec, add2 } from "@thi.ng/vectors";
import {
	SUBDIV_CHAIKIN,
	SUBDIV_CUBIC,
	SUBDIV_DISPLACE,
	SUBDIV_DLG,
	SUBDIV_MID,
	SUBDIV_THIRDS,
	subdivide,
	type SubdivKernel,
} from "../src/index.js";

const visualizeOpen = (kernel: SubdivKernel, iter = 4) =>
	svgDoc(
		{ __margin: 20, weight: 0.5 },
		...mapIndexed(
			(i, pts) => {
				const col = cosineColor(
					COSINE_GRADIENTS["orange-magenta-blue"],
					1
				);
				pts = pts.map((p) => add2([], p, [140 * i, 0]));
				return group({}, [
					polyline(pts, { stroke: col }),
					points(pts, { fill: col, stroke: "none", size: 2 }),
				]);
			},
			iterate(
				(pts) => subdivide(pts, [kernel], false),
				<ReadonlyVec[]>[
					[0, 0],
					[0, 100],
					[50, 50],
					[100, 100],
					[100, 0],
				],
				iter
			)
		)
	);

const visualizeClosed = (kernel: SubdivKernel, iter = 4) =>
	svgDoc(
		{ __margin: 20, weight: 0.5 },
		...mapIndexed(
			(i, pts) => {
				const col = cosineColor(
					COSINE_GRADIENTS["orange-magenta-blue"],
					1
				);
				pts = pts.map((p) => add2([], p, [140 * i, 0]));
				return group({}, [
					polygon(pts, { stroke: col }),
					points(pts, { fill: col, stroke: "none", size: 2 }),
				]);
			},
			iterate(
				(pts) => subdivide(pts, [kernel], true),
				<ReadonlyVec[]>[
					[0, 0],
					[100, 0],
					[100, 100],
					[0, 100],
				],
				iter
			)
		)
	);

for (let [id, kernel] of pairs({
	chaikin: SUBDIV_CHAIKIN,
	cubic: SUBDIV_CUBIC,
	mid: SUBDIV_MID,
	thirds: SUBDIV_THIRDS,
	dlg: SUBDIV_DLG,
	displace: SUBDIV_DISPLACE([
		[0.25, 0.05],
		[0.75, -0.05],
	]),
})) {
	writeText(`export/subdiv-${id}-open.svg`, asSvg(visualizeOpen(kernel)));
	writeText(`export/subdiv-${id}-closed.svg`, asSvg(visualizeClosed(kernel)));
}
