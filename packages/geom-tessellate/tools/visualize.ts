// SPDX-License-Identifier: Apache-2.0
import { writeText } from "@thi.ng/file-io";
import {
	asSvg,
	edgePointsFromTessellation,
	groupFromTessellation,
	line,
	star,
	starWithCentroid,
	svgDoc,
	tessellate,
} from "@thi.ng/geom";
import { kebab } from "@thi.ng/strings";
import { map, mapcat, mapcatIndexed, pairs } from "@thi.ng/transducers";
import {
	Tessellator,
	earCut,
	edgeSplit,
	inset,
	quadFan,
	rimTris,
	triFan,
	triFanBoundary,
	triFanSplit,
} from "../src/index";

const visualize = (tess: Tessellator) =>
	asSvg(
		svgDoc(
			{ __margin: 30 },
			...[3, 4, 6, 8].map((n, i) =>
				groupFromTessellation(
					tessellate(starWithCentroid([i * 210, 0], 100, n, [1]), [
						tess,
					])
				)
			)
		)
	);

for (let [id, tess] of pairs({
	earCut,
	edgeSplit,
	inset: inset(),
	rimTris,
	triFan,
	triFanBoundary,
	triFanSplit,
	quadFan,
})) {
	writeText(`export/${kebab(id)}.svg`, visualize(tess));
}
