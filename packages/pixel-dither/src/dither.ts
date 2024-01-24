import type { IntBuffer } from "@thi.ng/pixel";
import { range } from "@thi.ng/pixel/range";
import type { DitherKernel, DitherOpts } from "./api.js";

/**
 * Generic kernel-based dithering. Takes a {@link DitherKernel} and integer
 * pixel buffer (multiple channels supported). Applies dithering to all (or
 * configured) channels using provided options. Returns modified pixel buffer.
 *
 * @param kernel -
 * @param img -
 * @param opts -
 */
export const ditherWith = (
	kernel: DitherKernel,
	img: IntBuffer,
	opts?: Partial<DitherOpts>
) => {
	const { channels, bleed, threshold } = {
		bleed: 1,
		threshold: 0.5,
		...opts,
	};
	const { format, width, height } = img;
	const { ox, oy, weights, shift } = kernel;
	let p: number, err: number;
	for (let cid of channels || range(format.channels.length)) {
		const cimg = img.getChannel(cid);
		const chan = format.channels[cid];
		const $thresh = chan.num * threshold;
		const $max = chan.mask0;
		const data = new Int32Array(cimg.data);
		for (let y = 0; y < height; y++) {
			for (let x = 0, i = x + y * width; x < width; x++, i++) {
				p = data[i] < $thresh ? 0 : $max;
				err = (data[i] - p) * bleed;
				data[i] = p;
				if (!err) continue;
				for (let j = ox.length; j-- > 0; ) {
					const xx = x + ox[j];
					const yy = y + oy[j];
					if (yy >= 0 && yy < height && xx >= 0 && xx < width) {
						data[yy * width + xx] += (err * weights[j]) >> shift;
					}
				}
			}
		}
		cimg.data.set(data);
		img.setChannel(cid, cimg);
	}
	return img;
};
