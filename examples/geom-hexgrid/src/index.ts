import {
	Polygon,
	TESSELLATE_EDGE_SPLIT,
	TESSELLATE_QUAD_FAN,
	TESSELLATE_RIM_TRIS,
	TESSELLATE_TRI_FAN,
	TESSELLATE_TRI_FAN_SPLIT,
	asPolygon,
	asSvg,
	circle,
	group,
	groupFromTessellation,
	svgDoc,
	tessellate,
	withAttribs,
} from "@thi.ng/geom";
import {
	comp,
	mapIndexed,
	mapcat,
	push,
	range2d,
	transduce,
} from "@thi.ng/transducers";
import { dist2 } from "@thi.ng/vectors";

const SIN60 = Math.sin(Math.PI / 3);

// cell diameter
const D = 80;
// grid res
const RES = 10;
// grid center pos
const CENTER = [(RES - 1) / 2, (RES - 1) / 2];

// compute hex grid layout & cell polygons
let cells = [
	...mapcat(
		([x, y]) =>
			// create regular hexagon by sampling a circle at 6 points
			asPolygon(
				circle(
					// transfer regular grid coords -> hex layout
					[x * 0.75 * D, (y + (x & 1 ? 0 : 0.5)) * SIN60 * D],
					D / 2,
					{ gridPos: [x, y] }
				),
				6
			),
		// grid iterator
		range2d(RES, RES)
	),
];

// subdivide all cell polys and form new shapes
const polys = transduce(
	comp(
		mapcat(
			(cell) =>
				// actual tessellation: choose one or more tessellation methods
				// (applied iteratively), also experiment with duplication and/or
				// different orders...
				// `tessellate()` returns a `Tessellation`, which we convert into
				// a group of polygons. Since groups are iterable and we're using
				// `mapcat()` here, the output of this step will be just a sequence
				// of these result polygons...
				groupFromTessellation(
					tessellate(cell, [
						TESSELLATE_EDGE_SPLIT,
						TESSELLATE_QUAD_FAN,
						// TESSELLATE_TRI_FAN,
						// TESSELLATE_TRI_FAN_SPLIT,
						// TESSELLATE_RIM_TRIS,
					])
				)

			// (using the cell position or attribs each cell can also use a
			// different configuration, resulting in a more complex/varied
			// tessellation... comment out the above tessellate() call and
			// uncomment/enable the one below instead...)

			// groupFromTessellation(
			// 	tessellate(
			// 		cell,
			// 		// make tessellation config dependent on distance from center
			// 		dist2(CENTER, cell.attribs!.gridPos) < 4
			// 			? [TESSELLATE_EDGE_SPLIT, TESSELLATE_QUAD_FAN]
			// 			: [TESSELLATE_TRI_FAN, TESSELLATE_TRI_FAN]
			// 	)
			// )
		),
		// assign color attribs to each polygon
		mapIndexed((i, poly) =>
			withAttribs(
				<Polygon>poly,
				// optional attribs
				{ fill: i & 1 ? "black" : "yellow" }
			)
		)
	),
	push<Polygon>(),
	cells
);

// wrap all polygons as single group (optional)
const geo = group({}, polys);

// serialize to SVG
document.body.innerHTML = asSvg(svgDoc({}, geo));
