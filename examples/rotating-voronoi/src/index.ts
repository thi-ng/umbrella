import { downloadWithMime } from "@thi.ng/dl-asset/raw";
import { simplify } from "@thi.ng/geom-resample/simplify";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { asCubic } from "@thi.ng/geom/as-cubic";
import { asSvg, svgDoc } from "@thi.ng/geom/as-svg";
import { group } from "@thi.ng/geom/group";
import { pathFromCubics } from "@thi.ng/geom/path";
import { points } from "@thi.ng/geom/points";
import { polygon } from "@thi.ng/geom/polygon";
import { rect } from "@thi.ng/geom/rect";
import { vertices } from "@thi.ng/geom/vertices";
import { canvas } from "@thi.ng/hdom-canvas";
import { PI, TAU } from "@thi.ng/math/api";
import { SYSTEM } from "@thi.ng/random/system";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { checkbox, slider } from "./controllers";
import {
	type AppState,
	animationStream,
	mainStream,
	scaleStream,
} from "./stream-state";

const edge = window.innerWidth * 0.7;
const width = edge;
const height = edge;
const radius = (width / 2) * 0.8;
const center = [width / 2, height / 2];

const rndInt = (min: number, max: number) => SYSTEM.minmax(min, max) | 0;

const startingCircles: Array<[number, number, boolean]> = [
	[radius / 1, rndInt(4, 20), true],
	[radius / 2, rndInt(4, 20), false],
	[radius / 4, rndInt(4, 20), true],
	[radius / 8, rndInt(4, 20), false],
];

const pointsInCircle = (
	_center: Vec,
	_radius: number,
	_num: number,
	_angle: number
) => [
	...map(
		(index) => cartesian2(null, [_radius, index * TAU + _angle], _center),
		normRange(_num, false)
	),
];

mainStream.transform(map(appRender), updateDOM());

function computeVoronoi(state: AppState) {
	const delta = state.frameValue / 100;
	const doSave = state.keyValue === "s";

	const startPoints = [
		...mapcat(
			([rad, density, clockwise]) =>
				pointsInCircle(
					center,
					rad,
					density,
					clockwise ? delta : PI - delta
				),
			startingCircles
		),
	];

	const bounds = rect([width, height], { fill: "black" });
	const mesh = new DVMesh();
	mesh.addKeys(startPoints, 0.01);
	const cells = mesh.voronoi(vertices(bounds));

	const voronoi = [
		bounds,

		group(
			{ fill: "white", "stroke-width": 1 },
			cells.map((cell) =>
				pathFromCubics(
					asCubic(polygon(simplify(cell, 0.5, true)), {
						scale: state.scaleValue,
					})
				)
			)
		),

		points(doSave ? [] : startPoints, {
			size: 4,
			shape: "circle",
			fill: "gray",
		}),
	];

	if (doSave) {
		const svg = asSvg(
			svgDoc(
				{
					width,
					height,
					viewBox: `0 0 ${width} ${height}`,
					"stroke-width": 0.25,
				},
				...voronoi
			)
		);
		downloadWithMime(`${new Date().getTime()}-voronoi.svg`, svg, {
			mime: "image/svg+xml",
		});
	}

	return voronoi;
}

function appRender(state: AppState) {
	return [
		"div.ma3.flex.flex-column.flex-row-l.flex-row-m.sans-serif",
		[
			[
				"div.pr3.w-100.w-30-l.w-30-m",
				["h1", "Rotating voronoi"],
				[
					"p",
					"Based on a M. Bostock",
					[
						"a",
						{
							href: "https://observablehq.com/@mbostock/rotating-voronoi",
						},
						" observablehq sketch",
					],
					". ",

					"Originally from an ",
					[
						"a",
						{
							href: "https://www.flickr.com/photos/quasimondo/8254540763/",
						},
						"ornament",
					],
					" by Mario Klingemann.",
				],
				["p", "Press `s` to save the SVG file."],
				[
					"div.mv3",
					slider(
						state.scaleValue,
						(x: number) => scaleStream.next(x),
						0,
						1.2,
						0.01,
						"Tangent scale factor"
					),
					checkbox(
						state.animationValue,
						(x: boolean) => animationStream.next(x),
						"Animation"
					),
				],
			],
			[
				"div.flex.justify-center",
				[canvas, { width, height }, ...computeVoronoi(state)],
			],
		],
	];
}

// if (process.env.NODE_ENV !== "production") {
//     const hot = (<any>module).hot;
//     hot && hot.dispose(() => mainStream.done());
// }
