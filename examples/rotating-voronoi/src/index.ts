// SPDX-License-Identifier: Apache-2.0
import { downloadWithMime } from "@thi.ng/dl-asset";
import {
	asSvg,
	group,
	offset,
	points,
	Polygon,
	polygon,
	rect,
	simplify,
	SUBDIV_CUBIC,
	subdivCurve,
	svgDoc,
	vertices,
} from "@thi.ng/geom";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { canvas } from "@thi.ng/hdom-canvas";
import { PI, TAU } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { map, mapcat, normRange } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { cartesian2, type Vec } from "@thi.ng/vectors";
import { checkbox, slider } from "./controllers.js";
import { appState, mainStream, type AppState } from "./state.js";

const edge = Math.min(window.innerWidth * 0.7, window.innerHeight * 0.95);
const width = edge;
const height = edge;
const radius = (width / 2) * 0.8;
const center = [width / 2, height / 2];

const rndInt = (min: number, max: number) => SYSTEM.minmaxInt(min, max);

const startingCircles: Array<[number, number, boolean]> = [
	[radius / 1, rndInt(4, 20), true],
	[radius / 2, rndInt(4, 20), false],
	[radius / 4, rndInt(4, 20), true],
	[radius / 8, rndInt(4, 20), false],
];

const pointsInCircle = (
	center: Vec,
	radius: number,
	num: number,
	angle: number
) => [
	...map(
		(index) => cartesian2(null, [radius, index * TAU + angle], center),
		normRange(num, false)
	),
];

const computeVoronoi = (state: AppState) => {
	const delta = state.frame * state.speed * 0.01;
	const doSave = state.key === "s";

	const startPoints = [
		center,
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
	const cells = mesh
		.voronoi(vertices(bounds))
		.map((cell) => polygon(cell))
		.map((cell) =>
			state.inset ? <Polygon>offset(cell, -state.inset) : cell
		);

	const voronoi = [
		bounds,

		// original cells
		group({ stroke: "red" }, state.showCells ? cells : []),

		// subdivided cells
		group(
			{ fill: "white", "stroke-width": 1 },
			cells.map((cell) =>
				// pathFromCubics(asCubic(simplify(cell, 0.5), { scale: 0.5 }))
				subdivCurve(simplify(cell, 0.5), SUBDIV_CUBIC, state.iter)
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
};

const appRender = (state: AppState) => [
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
				slider(appState.speed, 0, 1, 0.1, "Rotation speed"),
				slider(appState.inset, 0, 10, 1, "Inset"),
				slider(appState.iter, 1, 4, 1, "Subdivision iterations"),
				checkbox(appState.showCells, "Show original cells"),
				checkbox(appState.animate, "Animation"),
			],
		],
		[
			"div.flex.justify-center",
			[canvas, { width, height }, ...computeVoronoi(state)],
		],
	],
];

mainStream.transform(map(appRender), updateDOM());
