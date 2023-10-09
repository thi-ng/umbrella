import { repeatedly2d } from "@thi.ng/transducers/repeatedly2d";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in column-major order.
 *
 * @param opts -
 */
export const columns2d = (opts: GridIterOpts2D) => {
	const { cols, rows, tx } = __opts(opts);
	return repeatedly2d((y, x) => tx(x, y), rows | 0, cols | 0);
};
