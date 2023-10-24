// thing:no-export
import type { IGrid2D, Nullable, TypedArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPrimitive } from "@thi.ng/checks/is-primitive";
import type { Shader2D } from "./api.js";

/** @internal */
export const __draw2D = <T extends any[] | TypedArray, P>(
	pts: Nullable<Iterable<ArrayLike<number>>>,
	grid: IGrid2D<T, P>,
	val: P | Shader2D<P>
) =>
	isFunction(val)
		? __drawShader2D(pts, grid, val)
		: __drawSolid2D(pts, grid, val);

/** @internal */
export const __drawSolid2D = <T extends any[] | TypedArray, P>(
	pts: Nullable<Iterable<ArrayLike<number>>>,
	grid: IGrid2D<T, P>,
	val: P
) => {
	if (!pts) return grid;
	if (isPrimitive(val)) {
		const {
			data,
			offset,
			stride: [sx, sy],
		} = grid;
		for (let p of pts) {
			data[offset + p[0] * sx + p[1] * sy] = val;
		}
	} else {
		for (let p of pts) {
			grid.setAtUnsafe(p[0], p[1], val);
		}
	}
	return grid;
};

/** @internal */
export const __drawShader2D = <T extends any[] | TypedArray, P>(
	pts: Nullable<Iterable<ArrayLike<number>>>,
	grid: IGrid2D<T, P>,
	shader: Shader2D<P>
) => {
	if (!pts) return grid;
	if (isPrimitive(grid.getAtUnsafe(0, 0))) {
		const {
			data,
			offset,
			stride: [sx, sy],
		} = grid;
		for (let { 0: x, 1: y } of pts) {
			data[offset + x * sx + y * sy] = shader(grid, x, y);
		}
	} else {
		for (let { 0: x, 1: y } of pts) {
			grid.setAtUnsafe(x, y, shader(grid, x, y));
		}
	}
	return grid;
};
