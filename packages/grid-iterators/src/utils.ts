// thing:no-export
import { asInt } from "@thi.ng/api/typedarray";
import type { GridIterOpts } from "./api.js";
import { ident } from "./transforms.js";

export const __opts = (opts: GridIterOpts) => {
	let { cols, rows, tx } = { rows: opts.cols, tx: ident, ...opts };
	[cols, rows] = asInt(cols, rows);
	return { cols, rows, tx: tx(cols, rows) };
};
