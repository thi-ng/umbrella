import type { IGrid2D, Predicate2, TypedArray } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPrimitive } from "@thi.ng/checks/is-primitive";
import { equiv } from "@thi.ng/equiv";
import { floodFill as $fill } from "@thi.ng/grid-iterators/flood-fill";
import type { Shader2D } from "./api.js";
import { isInBounds2D } from "./checks.js";
import { __draw2D } from "./draw.js";

/**
 * Fills cells in the connected region around `x,y` with given value or shader
 * function. If the latter, the shader is called for each grid coordinate and
 * returns a fill value. Returns updated grid.
 *
 * @param grid -
 * @param x -
 * @param y -
 * @param val -
 */
export const floodFill = <T extends any[] | TypedArray, P>(
	grid: IGrid2D<T, P>,
	x: number,
	y: number,
	val: P | Shader2D<P>
) =>
	isInBounds2D(grid, x, y)
		? __draw2D(
				$fill(__pred(grid, x, y), x, y, grid.size[0], grid.size[1]),
				grid,
				val
		  )
		: grid;

const __pred = (
	img: IGrid2D<any, any>,
	x: number,
	y: number
): Predicate2<number> => {
	const {
		data,
		offset,
		stride: [stride, rowStride],
	} = img;
	let srcVal = img.getAtUnsafe(x, y);
	if (isPrimitive(srcVal)) {
		return (x, y) => data[offset + x * stride + y * rowStride] === srcVal;
	}
	if (isIterable(srcVal)) {
		srcVal = [...srcVal];
	}
	return (x, y) => equiv(img.getAtUnsafe(x, y), srcVal);
};
