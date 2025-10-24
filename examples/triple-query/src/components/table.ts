// SPDX-License-Identifier: Apache-2.0
import { map } from "@thi.ng/transducers";
import type { AppContext } from "../api.js";

const row = (ctx: AppContext, body: Iterable<any>) => [
	"tr",
	ctx.ui.table.row,
	...body,
];

export const table = (
	ctx: AppContext,
	layout: any[],
	head: Iterable<any>,
	body: Iterable<Iterable<any>>
) => [
	"table",
	ctx.ui.table.root,
	map((x) => ["col", { style: { width: x } }], layout || []),
	[row, map((x) => ["th", ctx.ui.table.head, x], head)],
	map(
		(cols: any) => [row, map((x) => ["td", ctx.ui.table.cell, x], cols)],
		body
	),
];
