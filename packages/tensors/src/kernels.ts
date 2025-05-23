import { constant, tensor } from "./tensor.js";

/**
 * 1D Sobel convolution kernel.
 */
export const SOBEL1 = tensor([-1, 0, 1]);

/**
 * 2D Sobel convolution kernel (along X, aka inner axis).
 *
 * @remarks
 * Use `SOBEL2.transpose([1, 0])` for other axis.
 */
export const SOBEL2 = tensor([
	[-1, 0, 1],
	[-2, 0, 2],
	[-1, 0, 1],
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
 * Higher order 2D box blur convolution kernel. Returns 2D tensor of size
 * `2*r+1`.
 *
 * @param r
 */
export const BOX_BLUR2 = (r: number) => {
	r = 2 * r + 1;
	return constant([r, r], 1 / (r * r), "num");
};

/**
 * 2D 3x3 box blur convolution kernel
 */
export const BOX_BLUR2_3 = BOX_BLUR2(1);

/**
 * 2D 5x5 box blur convolution kernel
 */
export const BOX_BLUR2_5 = BOX_BLUR2(2);

export const GAUSSIAN_BLUR2_3 = tensor([
	[1 / 16, 1 / 8, 1 / 16],
	[1 / 8, 1 / 4, 1 / 8],
	[1 / 16, 1 / 8, 1 / 16],
]);

export const GAUSSIAN_BLUR2_5 = tensor([
	[1 / 256, 1 / 64, 3 / 128, 1 / 64, 1 / 256],
	[1 / 64, 1 / 16, 3 / 32, 1 / 16, 1 / 64],
	[3 / 128, 3 / 32, 9 / 64, 3 / 32, 3 / 128],
	[1 / 64, 1 / 16, 3 / 32, 1 / 16, 1 / 64],
	[1 / 256, 1 / 64, 3 / 128, 1 / 64, 1 / 256],
]);

/**
 * Higher order Gaussian blur kernel for given integer radius `r`.
 * Returns 2D tensor with resulting kernel size of `2r+1`.
 *
 * @param r -
 */
export const GAUSSIAN2 = (r: number) => {
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
