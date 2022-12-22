import { writeText } from "@thi.ng/file-io";
import { asSvg, bounds, group, rectWithCentroid, svgDoc } from "@thi.ng/geom";
import { asPolygons, asSDF, sample2d, SDFAttribs } from "@thi.ng/geom-sdf";
import { range } from "@thi.ng/transducers";

const RES = [512, 512];
const margin = 36;

for (let op of <const>["none", "chamfer", "round", "smooth", "steps"]) {
	for (let mode of <const>["union", "isec", "diff"]) {
		const __sdf = <Partial<SDFAttribs>>{ combine: mode };
		if (op !== "none") __sdf[op] = <any>(op === "steps" ? [50, 4] : 50);
		const scene = group(
			{
				stroke: [0.5, 0, 1, 0.5],
				weight: 3,
				__sdf,
			},
			[rectWithCentroid([-33, -33], 200), rectWithCentroid([33, 33], 200)]
		);

		const sceneBounds = bounds(scene, margin)!;
		const sdf = asSDF(scene);
		const img = sample2d(sdf, sceneBounds, RES);
		const polys = asPolygons(
			img,
			sceneBounds,
			RES,
			range(0, margin, 4),
			0.25
		);

		const path = `export/rect-${op}-${mode}.svg`;
		console.log(path);

		writeText(
			path,
			asSvg(
				svgDoc(
					{
						width: 280,
						height: 280,
						viewBox: "-180 -180 360 360",
					},
					group({ weight: 0.5 }, polys),
					scene
				)
			)
		);
	}
}
