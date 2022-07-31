import { asInt } from "@thi.ng/api/typedarray";
import { ceilPow2 } from "@thi.ng/binary/pow";
import { demux2 } from "@thi.ng/morton/mux";

/**
 * Yields 2D grid coordinates in Z-curve (Morton) order. A perfect
 * Z-curve is only generated if `cols` AND `rows` are equal and a power
 * of 2. Due to using 32bit morton codes, only supports grid sizes up to
 * 32767 (0x7fff) in either dimension.
 *
 * @param cols -
 * @param rows -
 */
export function* zcurve2d(cols: number, rows = cols) {
	[cols, rows] = asInt(cols, rows);
	const max = ceilPow2(Math.pow(Math.max(cols, rows), 2));
	for (let i = 0; i < max; i++) {
		const p = demux2(i);
		if (p[0] < cols && p[1] < rows) {
			yield p;
		}
	}
}
