import { map } from "@thi.ng/transducers/map";
import { range2d } from "@thi.ng/transducers/range2d";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in column-major order.
 *
 * @param opts -
 */
export const columns2d = (opts: GridIterOpts2D) => {
	const { cols, rows, tx } = __opts(opts);
	return map((p) => tx(p[1], p[0]), range2d(rows | 0, cols | 0));
};
