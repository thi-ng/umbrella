import { splat4_24 } from "@thi.ng/binary/splat";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { fpsCounter } from "@thi.ng/hdom-components/fps-counter";
import { start } from "@thi.ng/hdom/start";
import { css } from "@thi.ng/hiccup-css/css";
import { injectStyleSheet } from "@thi.ng/hiccup-css/inject";
import { U24 } from "@thi.ng/strings/radix";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { range } from "@thi.ng/transducers/range";
import { transduce } from "@thi.ng/transducers/transduce";

const SIZE = "0.5rem";

injectStyleSheet(
	css([
		map(
			(x: number) => [
				`.cell-${x}`,
				{
					background: `#${U24(splat4_24(x))}`,
				},
			],
			range(16)
		),
		map(
			(x: number) => [
				`.xcell-${x}`,
				{
					background: `#${U24(splat4_24(x) | 0x00ff00)}`,
				},
			],
			range(16)
		),
		[
			".cell",
			{
				display: "inline-block",
				width: SIZE,
				height: SIZE,
			},
		],
		[
			".row",
			{
				height: SIZE,
			},
		],
	])
);

const grid = <any>{
	render(
		_: any,
		cells: number[],
		w: number,
		numChanges: number,
		frame: number
	) {
		if (!frame) {
			this.prevChanged = null;
			this.prevChangedRows = null;
			return ["div"];
		}
		const isFirst = !this.prevChanged;
		const num = w * w;
		const changed = new Set<number>();
		const changedRows = new Set<number>();
		for (let i = 0; i < numChanges; i++) {
			const idx = (Math.random() * num) | 0;
			changed.add(idx);
			changedRows.add((idx / w) | 0);
			cells[idx] = (cells[idx] + 1) % 16;
		}
		const body = transduce<number, any, any[]>(
			comp(
				mapIndexed((i, x) => [
					"span",
					{
						key: "c" + i,
						class: `cell ${changed.has(i) ? "xcell" : "cell"}-${x}`,
					},
				]),
				partition(w),
				mapIndexed((i, row) => [
					"div.row",
					{
						key: "r" + i,
						__skip:
							!isFirst &&
							!(
								this.prevChangedRows.has(i) ||
								changedRows.has(i)
							),
					},
					row,
				])
			),
			push(),
			["div", {}],
			cells
		);
		let mergedCells = new Set(changed);
		if (this.prevChanged) {
			for (let x of this.prevChanged) {
				mergedCells.add(x);
			}
		}
		const mergedRows = new Set(changedRows);
		if (this.prevChangedRows) {
			for (let x of this.prevChangedRows) {
				mergedRows.add(x);
			}
		}
		this.stats = {
			cells: mergedCells.size,
			rows: mergedRows.size,
			total: mergedCells.size + mergedRows.size,
		};
		this.prevChanged = changed;
		this.prevChangedRows = changedRows;
		return body;
	},
};

const domStats = (_: any, grid: any, res: number, _static: number) =>
	grid && grid.stats
		? [
				"div",
				["div", ["span.pink", grid.stats.cells], " cells updated"],
				["div", ["span.pink", grid.stats.rows], " rows updated"],
				[
					"div",
					["span.pink", res * res + res + _static],
					" DOM nodes total",
				],
		  ]
		: null;

const newCells = (res: number) => new Array(res * res).fill(0);

const stats = fpsCounter({ history: 50, sparkline: { width: 100 } });

let res = 48;
let delta = 256;
let frame = -1;
let cells = newCells(res);

const resOpts = [
	[24, 24],
	[32, 32],
	[40, 40],
	[48, 48],
	[56, 56],
	[64, 64],
];
const deltaOpts = [
	...map((i) => [i, i], [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]),
];

start(() => {
	frame++;
	return [
		"div.ma3.code.f7",
		[
			"div.measure.lh-copy",
			`Each grid cell is one <span> element. Each frame ${delta} random cell states
                will be updated (highlighted in green), resulting in approx. twice as many
                DOM updates (due to resetting of updated cells from previous frame).`,
		],
		["div.mt3", [grid, cells, res, delta, frame]],
		["div.mt3", [domStats, grid, res, 46]],
		["div.mt3", [stats]],
		[
			"div.mt3",
			["span.w5.dib", "Resolution: "],
			[
				dropdown,
				{
					class: "w3 code",
					onchange: (e: Event) => (
						(res = parseInt((<HTMLSelectElement>e.target).value)),
						(frame = -1),
						(cells = newCells(res))
					),
				},
				resOpts,
				res,
			],
		],
		[
			"div.mt3",
			["span.w5.dib", "Random updates/frame: "],
			[
				dropdown,
				{
					class: "w3 code",
					onchange: (e: Event) =>
						(delta = parseInt((<HTMLSelectElement>e.target).value)),
				},
				deltaOpts,
				delta,
			],
		],
		[
			"div.mt3",
			[
				"a",
				{
					href: "https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-benchmark2",
				},
				"Source",
			],
		],
	];
});
