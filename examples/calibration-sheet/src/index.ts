// SPDX-License-Identifier: Apache-2.0
import { adaptiveCanvas2d } from "@thi.ng/canvas";
import { arc, extra, group, line, rect, text } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { GridLayout, gridLayout, type LayoutBox } from "@thi.ng/layout";
import { mix, roundTo } from "@thi.ng/math";
import { randomID } from "@thi.ng/random";
import { dropNth, map, normRange, range, range2d } from "@thi.ng/transducers";

const W = 900;
const H = 600;
const MARGIN = 4;

// what follows are component and helper functions to assemble the calibration sheet
// the actual main scene definition is at the end of this file

// all components are based on a grid layout (defined further below) from which
// cells/cellspans are obtained and then used to dynamically compute/adapt
// component geometries...

const swatches = (layout: GridLayout, num: number) => {
	const nested = layout.nest(num, [layout.cols, 1]);
	const rows = nested.rowsForHeight(nested.cellW + 16);
	const bgWidth = layout.width / 2 + MARGIN;
	let { x, y, cellW: w, cellHG: h } = nested;
	h *= rows;
	return group({}, [
		rect([x - MARGIN, y - MARGIN], [bgWidth, h], { fill: "black" }),
		rect([x - MARGIN + bgWidth, y - MARGIN], [bgWidth, h], {
			fill: "white",
		}),
		...map((t) => {
			const cell = nested.next([1, rows]);
			return group({ translate: [cell.x, y] }, [
				rect(w, { fill: [t, t, t] }),
				text([w / 2, w + 10], (t * 100) | 0, {
					compose: "difference",
					fill: "white",
				}),
			]);
		}, normRange(num, false)),
	]);
};

const rampGradient = (
	from: number[],
	to: number[],
	col1: string | number[] = "black",
	col2: string | number[] = "white",
	id = randomID()
) =>
	extra([
		"linearGradient",
		{ id: id, from, to },
		[
			[0, col1],
			[1, col2],
		],
	]);

const ramp = (
	box: LayoutBox,
	col1?: string | number[],
	col2?: string | number[],
	id = randomID()
) =>
	group({}, [
		rampGradient(
			[box.x, box.y],
			box.w > box.h ? [box.x + box.w, box.y] : [box.x, box.y + box.h],
			col1,
			col2,
			id
		),
		rect([box.x, box.y], [box.w, box.h], { fill: `$${id}` }),
	]);

const opposingRamps = (box: LayoutBox) =>
	group({ translate: [box.x, box.y] }, [
		ramp({ ...box, h: box.h / 2, x: 0, y: 0 }),
		ramp({ ...box, h: box.h / 2, x: 0, y: box.h / 2 }, "white", "black"),
		group(
			{ compose: "difference", stroke: "white" },
			map(
				(x: number) => line([x, 0], [x, box.h]),
				map((t) => mix(0, box.w, t), range(0.05, 1, 0.05))
			)
		),
	]);

const disc = (
	box: LayoutBox,
	r: number,
	col1: string,
	col2: string,
	id = randomID()
) =>
	group({ translate: [box.x, box.y] }, [
		extra([
			"radialGradient",
			{
				id: id,
				from: [r, r],
				to: [r, r],
				r1: 0,
				r2: r,
			},
			[
				[0, col1],
				[1, col2],
			],
		]),
		rect(r * 2, { fill: `$${id}` }),
		group(
			{
				compose: "difference",
				stroke: "white",
				fill: "none",
				dash: [2, 2],
			},
			map(
				(t) => arc([r, r], [t * r, t * r], 0, 0, Math.PI),
				range(0.1, 1.01, 0.1)
			)
		),
	]);

const radialGradients = (layout: GridLayout) =>
	group(
		{},
		map(
			([a, b]) => disc(layout.nextSquare(), layout.width / 2, a, b),
			[
				["white", "black"],
				["black", "white"],
			]
		)
	);

const checkerRamps = (layout: GridLayout) =>
	group(
		{},
		map(
			([a1, b1, a2, b2]) => {
				const box = layout.next([
					layout.colsForWidth(50),
					layout.rowsForHeight(layout.height - layout.currY),
				]);
				const h = roundTo(box.h, 5);
				const id = randomID();
				return group({ translate: [box.x, box.y] }, [
					ramp({ ...box, x: 0, y: 0, h }, [a1, a1, a1], [b1, b1, b1]),
					rampGradient(
						[0, 0],
						[0, box.h],
						[a2, a2, a2],
						[b2, b2, b2],
						id
					),
					group({ fill: `$${id}` }, checkers(5, h / 5, 5)),
				]);
			},
			[
				[0, 1, 0.1, 0.9],
				[0, 0.1, 0.1, 0],
				[0.4, 0.6, 0.6, 0.4],
				[0.95, 1, 1, 0.9],
			]
		)
	);

const checkers = (cols: number, rows: number, size: number) =>
	map(
		([x, y]) => rect([x * size, y * size], size),
		dropNth(2, range2d(cols, rows))
	);

const placeholder = (box: LayoutBox) =>
	group({ translate: [box.x, box.y], stroke: "black", fill: "none" }, [
		rect([box.w, box.h]),
		line([0, 0], [box.w, box.h]),
		line([box.w, 0], [0, box.h]),
	]);

// grid layout definition
const layout = gridLayout(MARGIN, MARGIN, W - 2 * MARGIN, 50, MARGIN, MARGIN);

// geometry for the full calibration sheet
const scene = group(
	{
		__background: "white",
		scale: window.devicePixelRatio ?? 1,
		align: "center",
	},
	[
		// labeled swatches in different gradations
		...map((num) => swatches(layout, num), [20, 33, 50]),
		// opposing gradients
		opposingRamps(
			layout.next([layout.cols, layout.rowsForHeight(32 + MARGIN)])
		),
		// radial gradients (in nested layout)
		radialGradients(layout.nest(1, [11, 1])),
		// low contrast ramps with checker overlay
		checkerRamps(layout),
		// placeholder for a custom test image (to be added later)
		placeholder(
			layout.next([
				layout.colsForWidth(layout.width - layout.currX),
				layout.rowsForHeight(layout.height - layout.currY),
			])
		),
	]
);

// render all to a canvas
draw(adaptiveCanvas2d(W, H, document.getElementById("app")).ctx, scene);
