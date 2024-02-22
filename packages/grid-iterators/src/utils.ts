// thing:no-export
import { asInt } from "@thi.ng/api/typedarray";
import type { GridIterOpts2D } from "./api.js";
import { ident } from "./transforms.js";

export const __opts = (opts: GridIterOpts2D) => {
	let { cols, rows = opts.cols, tx = ident } = opts;
	[cols, rows] = asInt(cols, rows);
	return { cols, rows, tx: tx(cols, rows) };
};
