import type { IGrid2D, TypedArray } from "@thi.ng/api";
import type { Shader2D } from "./api.js";
import { ensureShader2D } from "./checks.js";

/**
 * Draws a filled polygon (simple, no holes) into given grid. Each grid cell's
 * value is obtained from user supplied shader function which will be called
 * with the pixel's `x,y` coords.
 *
 * Based on Efficient Polygon Fill Algorithm by Darel Rex Finley
 * http://alienryderflex.com/polygon_fill/
 *
 * Bounds calculation and clipping added by Karsten Schmidt
 *
 * @param grid -
 * @param pts -
 * @param val -
 */
export const fillPoly = <T extends any[] | TypedArray, P>(
	grid: IGrid2D<T, P>,
	pts: number[][],
	val: P | Shader2D<P>
) => {
	const numP = pts.length;
	const [width, height] = grid.size;
	const shader = ensureShader2D(val);
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (let i = numP; i-- > 0; ) {
		const { 0: x, 1: y } = pts[i];
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
	}
	minX = Math.max(minX | 0, 0);
	maxX = Math.min(maxX | 0, width - 1);
	minY = Math.max(minY | 0, 0);
	maxY = Math.min(maxY | 0, height - 1);
	if (minX >= width || maxX < 0 || minY >= height || maxY < 0) return;
	let i = 0;
	let k = 0;
	let j: number;
	const isec: number[] = [];
	for (let y = Math.max(0, minY); y <= maxY; y++) {
		i = k = 0;
		j = numP - 1;
		isec.length = 0;
		for (; i < numP; j = i, i++) {
			const { 0: pix, 1: piy } = pts[i];
			const { 0: pjx, 1: pjy } = pts[j];
			if ((piy < y && pjy >= y) || (pjy < y && piy >= y)) {
				isec[k++] = (pix + ((y - piy) / (pjy - piy)) * (pjx - pix)) | 0;
			}
		}
		isec.sort((a, b) => a - b);
		for (i = 0; i < k; i += 2) {
			let x1 = isec[i];
			if (x1 > maxX) break;
			let x2 = isec[i + 1];
			if (x2 > minX) {
				x1 < minX && (x1 = minX);
				x2 > maxX && (x2 = maxX);
				for (let x = x1; x <= x2; x++) {
					grid.setAtUnsafe(x, y, shader(grid, x, y));
				}
			}
		}
	}
};
