import { isNumber } from "@thi.ng/checks/is-number";
import { clamp } from "@thi.ng/math/interval";
import type { IntBuffer } from "@thi.ng/pixel";
import type { BayerMatrix, BayerSize } from "./api.js";

const init = (
	x: number,
	y: number,
	size: number,
	val: number,
	step: number,
	mat: number[][]
) => {
	if (size === 1) {
		!mat[y] && (mat[y] = []);
		mat[y][x] = val;
		return mat;
	}
	size >>= 1;
	const step4 = step << 2;
	init(x, y, size, val, step4, mat);
	init(x + size, y + size, size, val + step, step4, mat);
	init(x + size, y, size, val + step * 2, step4, mat);
	init(x, y + size, size, val + step * 3, step4, mat);
	return mat;
};

/**
 * Creates a Bayer matrix of given kernel size (power of 2) for ordered
 * dithering and use with {@link ditherPixels}
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Ordered_dithering
 *
 * @param size -
 */
export const defBayer = (size: BayerSize): BayerMatrix => ({
	mat: init(0, 0, size, 0, 1, []),
	invSize: 1 / (size * size),
	mask: size - 1,
});

/**
 * Single-channel/value ordered dither using provided Bayer matrix.
 *
 * @param mat -  matrix
 * @param dsteps - number of dest colors
 * @param drange - dest color range
 * @param srange - src color range
 * @param x - x pos
 * @param y - y pos
 * @param val - src value
 *
 * @internal
 */
const orderedDither1 = (
	{ mat, mask, invSize }: BayerMatrix,
	dsteps: number,
	drange: number,
	srange: number,
	x: number,
	y: number,
	val: number
) => {
	val =
		(dsteps * (val / srange) + mat[y & mask][x & mask] * invSize - 0.5) | 0;
	dsteps--;
	return clamp(val, 0, dsteps) * ((drange - 1) / dsteps);
};

/**
 * Applies in-place, ordered dithering using provided dither matrix
 * (or matrix size) and desired number of dither levels, optionally
 * specified individually (per channel). Each channel is be
 * processed independently. Channels can be excluded from dithering
 * by setting their target colors to zero or negative numbers.
 *
 * @remarks
 * A `size` of 1 will result in simple posterization of each
 * channel. The `numColors` value(s) MUST be in the `[0 ..
 * numColorsInChannel]` interval.
 *
 * Also see: {@link defBayer}
 *
 * @param img - pixel buffer
 * @param size - bayer dither matrix/size
 * @param numColors - num target colors/steps
 */
export const orderedDither = (
	img: IntBuffer,
	size: BayerSize | BayerMatrix,
	numColors: number | number[]
) => {
	const { data, format, width } = img;
	const steps = isNumber(numColors)
		? new Array<number>(format.channels.length).fill(numColors)
		: numColors;
	const mat = isNumber(size) ? defBayer(size) : size;
	for (
		let i = 0, n = data.length, nc = format.channels.length, x = 0, y = 0;
		i < n;
		i++
	) {
		let col = data[i];
		for (let j = 0; j < nc; j++) {
			const ch = format.channels[j];
			const num = ch.num;
			const cs = steps[j];
			cs > 0 &&
				(col = ch.setInt(
					col,
					orderedDither1(mat, cs, num, num, x, y, ch.int(col))
				));
		}
		data[i] = col;
		if (++x === width) {
			x = 0;
			y++;
		}
	}
	return img;
};
