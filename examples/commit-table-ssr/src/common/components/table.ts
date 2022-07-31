import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { AppContext } from "../api";

const thead = (ctx: AppContext, head: Iterable<any>) => [
	"thead",
	[
		row,
		ctx.ui.table.head.row,
		map((x) => ["th", ctx.ui.table.head.cell, x], head),
	],
];

const row = (ctx: AppContext, attribs: any, body: Iterable<any>) => [
	"tr",
	{ ...ctx.ui.table.row, ...attribs },
	...body,
];

/**
 * Generic HTML table component w/ column layout support & intermediate
 * headers. The `body` iterable MUST contain groups of rows, each group
 * with an optional new header row:
 *
 * ```
 * [table,
 *   // column layout
 *   ["25%", "25%", "50%"],
 *   // global header
 *   ["Price","Item","Description"],
 *   // body
 *   [
 *     // row group #1 w/o header
 *     [null, [
 *         [10.99, "Yaki Udon", "noodle dish"],
 *         [4.99, "Asahi", "beer"],
 *     ]],
 *     // row group #2 w/ header
 *     [["Subtotal", "VAT", "Total"], [
 *         [15.98, "20%", 19.18]
 *     ]]
 *   ]
 * ]
 * ```
 *
 * @param ctx -
 * @param layout - olumn sizes
 * @param head - eader cell values
 * @param body - ow chunks
 */
export const table = (
	ctx: AppContext,
	layout: (string | number)[],
	head: Iterable<any>,
	body: Iterable<Iterable<any>>
) => [
	"table",
	ctx.ui.table.root,
	map((x) => ["col", { style: { width: x } }], layout || []),
	[thead, head],
	mapcat(
		([hd, rows]) => [
			hd ? [thead, hd] : null,
			[
				"tbody",
				map(
					(cols: any) => [
						row,
						null,
						map((x) => ["td", ctx.ui.table.cell, x], cols),
					],
					rows
				),
			],
		],
		body
	),
];
