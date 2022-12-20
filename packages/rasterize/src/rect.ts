import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { isPrimitive } from "@thi.ng/checks";
import { hlineClipped, vlineClipped } from "@thi.ng/grid-iterators/hvline";
import { rows2d } from "@thi.ng/grid-iterators/rows";
import { concat } from "@thi.ng/transducers/concat";
import type { Shader2D } from "./api.js";
import { ensureShader2D } from "./checks.js";
import { __draw2D } from "./draw.js";

export const drawRect = <T extends any[] | TypedArray, P>(
	grid: IGrid2D<T, P>,
	x: number,
	y: number,
	w: number,
	h: number,
	val: P | Shader2D<P>,
	fill = false
) => {
	x |= 0;
	y |= 0;
	w |= 0;
	h |= 0;
	const {
		data,
		offset,
		size: [width, height],
		stride: [sx, sy],
	} = grid;
	if (fill) {
		if (x < 0) {
			w += x;
			x = 0;
		}
		if (y < 0) {
			h += y;
			y = 0;
		}
		const pts = rows2d({
			cols: Math.min(w, width - x),
			rows: Math.min(h, height - y),
		});
		const shader = ensureShader2D(val);
		if (isPrimitive(val)) {
			for (let { 0: xx, 1: yy } of pts) {
				xx += x;
				yy += y;
				data[offset + xx * sx + yy * sy] = shader(grid, xx, yy);
			}
		} else {
			for (let { 0: xx, 1: yy } of pts) {
				xx += x;
				yy += y;
				grid.setAtUnsafe(xx, yy, shader(grid, xx, yy));
			}
		}
		return grid;
	}
	return __draw2D(
		concat(
			hlineClipped(x, y, w, 0, 0, width, height),
			vlineClipped(x, y + 1, h - 2, 0, 0, width, height),
			hlineClipped(x, y + h - 1, w, 0, 0, width, height),
			vlineClipped(x + w - 1, y + 1, h - 2, 0, 0, width, height)
		),
		grid,
		val
	);
};
