// SPDX-License-Identifier: Apache-2.0
import { identity } from "@thi.ng/api/fn";
import type { KernelSpec } from "./api.js";
import { constant, tensor } from "./tensor.js";

/**
 * 1D Sobel convolution kernel.
 */
export const SOBEL1 = tensor([-1, 0, 1]);

/**
 * 2D Sobel convolution kernel (along outer axis).
 *
 * @remarks
 * Use `SOBEL2.transpose([1, 0])` for inner axis.
 */
export const SOBEL2 = tensor([
	[-1, -2, -1],
	[0, 0, 0],
	[1, 2, 1],
]);

/**
 * 3D Sobel convolution kernel (along outer axis).
 *
 * @remarks
 * Use `SOBEL3.transpose()` for other axes.
 */
export const SOBEL3 = tensor([
	[
		[-1, -2, -1],
		[-2, -4, -2],
		[-1, -2, -1],
	],
	[
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	],
	[
		[1, 2, 1],
		[2, 4, 2],
		[1, 2, 1],
	],
]);

/**
 * 2D edge detection convolution kernel factory for given integer radius `r`.
 * Returns 2D tensor of size `2*r+1`.
 *
 * @param r
 */
export const EDGE2 = (r: number) => {
	r |= 0;
	const w = 2 * r + 1;
	const data = new Array(w * w).fill(-1);
	data[data.length >> 1] = w * w - 1;
	return tensor("num", [w, w], { data, copy: false });
};

/**
 * 2D sharpen 3x3 kernel preset.
 */
export const SHARPEN2_3x3 = tensor([
	[0, -1, 0],
	[-1, 5, -1],
	[0, -1, 0],
]);

/**
 * 2D box blur convolution kernel factory for given integer radius `r`. Returns
 * 2D tensor of size `2*r+1`.
 *
 * @param r
 */
export const BOX_BLUR2 = (r: number) => {
	r = 2 * r + 1;
	return constant([r, r], 1 / (r * r), "num");
};

/**
 * 2D Gaussian blur kernel factory for given integer radius `r`. Returns 2D
 * tensor of size `2r+1`.
 *
 * @param r -
 */
export const GAUSSIAN_BLUR2 = (r: number) => {
	r |= 0;
	const sigma = -1 / (2 * ((Math.SQRT2 * r) / 3) ** 2);
	const res: number[] = [];
	let sum = 0;
	for (let y = -r; y <= r; y++) {
		for (let x = -r; x <= r; x++) {
			const g = Math.exp((x * x + y * y) * sigma);
			res.push(g);
			sum += g;
		}
	}
	const size = r * 2 + 1;
	return tensor("num", [size, size], {
		data: res.map((x) => x / sum),
		copy: false,
	});
};

const { max, min } = Math;

/**
 * Max. pool kernel factory for given window size and use with
 * {@link applyKernel}. The kernel produces the maximum value in its window.
 *
 * @param w
 * @param h
 */
export const MAX2_POOL = (w: number, h = w): KernelSpec<number> => {
	return {
		shape: [w, h],
		init: () => -Infinity,
		reduce: (acc, val) => max(acc, val),
		complete: identity,
	};
};

/**
 * Min. pool kernel factory for given window size and use with
 * {@link applyKernel}. The kernel produces the minimum value in its window.
 *
 * @param w
 * @param h
 */
export const MIN2_POOL = (w: number, h = w): KernelSpec<number> => {
	return {
		shape: [w, h],
		init: () => Infinity,
		reduce: (acc, val) => min(acc, val),
		complete: identity,
	};
};

/**
 * Kernel factory for given integer radius `r` and use with {@link applyKernel}.
 * The kernel marks local maxima within its window and produces only 0 or 1
 * result values (where 1 is used to mark the maxima).
 *
 * @param r
 */
export const MAXIMA2 = (r: number): KernelSpec<[number, number]> => {
	r |= 0;
	const w = 2 * r + 1;
	return {
		shape: [w, w],
		init: () => [-Infinity, 0],
		reduce: (acc, val, i, j) => {
			if (i === r && j === r) acc[1] = val;
			else acc[0] = max(acc[0], val);
			return acc;
		},
		complete: (acc) => (acc[1] > acc[0] ? 1 : 0),
	};
};

/**
 * Kernel factory for given integer radius `r` and use with {@link applyKernel}.
 * The kernel marks local minima within its window and produces only 0 or 1
 * result values (where 1 is used to mark the minima).
 *
 * @param r
 */
export const MINIMA2 = (r: number): KernelSpec<[number, number]> => {
	r |= 0;
	const w = 2 * r + 1;
	return {
		shape: [w, w],
		init: () => [Infinity, 0],
		reduce: (acc, val, i, j) => {
			if (i === r && j === r) acc[1] = val;
			else acc[0] = min(acc[0], val);
			return acc;
		},
		complete: (acc) => (acc[1] < acc[0] ? 1 : 0),
	};
};
