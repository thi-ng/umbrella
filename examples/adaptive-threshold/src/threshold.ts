import type { FloatBuffer } from "@thi.ng/pixel";
import { convolveChannel, POOL_THRESHOLD } from "@thi.ng/pixel/convolve";

/**
 * Adaptive threshold computation: uses `convolveChannel` with a custom pooling
 * kernel to compute mean brightness for each pixel's neighborhood, then applies
 * offset value and checks if pixel itself is above/below localized threshold.
 *
 * @param src -
 * @param windowSize -
 * @param offset -
 */
export const adaptiveThreshold = (
	src: FloatBuffer,
	windowSize: number,
	offset = 0
) =>
	convolveChannel(src, {
		kernel: {
			// pool kernel template for code generator:
			// take a `body` array of pixel lookups (W x H items)
			// w, h are kernel size
			// pool: (body, w, h) => {
			//     const center = body[(h >> 1) * w + (w >> 1)];
			//     const mean = `(${body.join("+")})/${w * h}`;
			//     return `(${center} - ${mean} + ${offset / 255}) < 0 ? 0 : 1`;
			// },
			// the same logic also available as preset:
			pool: POOL_THRESHOLD(offset / 255),
			size: windowSize,
		},
	});
