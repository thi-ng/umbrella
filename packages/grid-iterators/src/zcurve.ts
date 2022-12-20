import { ceilPow2 } from "@thi.ng/binary/pow";
import { demux2 } from "@thi.ng/morton/mux";
import type { GridIterOpts } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields 2D grid coordinates in Z-curve (Morton) order. A perfect
 * Z-curve is only generated if `cols` AND `rows` are equal and a power
 * of 2. Due to using 32bit morton codes, only supports grid sizes up to
 * 32767 (0x7fff) in either dimension.
 *
 * @param opts -
 */
export function* zcurve2d(opts: GridIterOpts) {
	const { cols, rows, tx } = __opts(opts);
	const max = ceilPow2(Math.pow(Math.max(cols, rows), 2));
	for (let i = 0; i < max; i++) {
		const [x, y] = demux2(i);
		if (x < cols && y < rows) {
			yield tx(x, y);
		}
	}
}
