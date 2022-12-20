import { map } from "@thi.ng/transducers/map";
import { range2d } from "@thi.ng/transducers/range2d";
import type { GridIterOpts } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in row-major order. Same as
 * [`range2d()`](https://docs.thi.ng/umbrella/transducers/functions/range2d.html).
 *
 * @param opts -
 */
export const rows2d = (opts: GridIterOpts) => {
	const { cols, rows, tx } = __opts(opts);
	return map((p) => tx(p[0], p[1]), range2d(cols, rows));
};
