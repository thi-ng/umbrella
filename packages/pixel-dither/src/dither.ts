import type { PackedBuffer } from "@thi.ng/pixel";
import { range } from "@thi.ng/pixel/range";
import type { DitherKernel, DitherOpts } from "./api.js";

/**
 * Generic kernel-based dithering. Takes a {@link DitherKernelFactory} and
 * integer pixel buffer (multiple channels supported). Applies dithering to all
 * (or configured) channels using provided options. Returns modified pixel
 * buffer.
 *
 * @param kernel
 * @param img
 * @param opts
 */
export const ditherWith = (
    kernel: DitherKernel,
    img: PackedBuffer,
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
        const pixels = new Int32Array(cimg.pixels);
        for (let y = 0; y < height; y++) {
            for (let x = 0, i = x + y * width; x < width; x++, i++) {
                p = pixels[i] < $thresh ? 0 : $max;
                err = (pixels[i] - p) * bleed;
                pixels[i] = p;
                if (!err) continue;
                for (let j = ox.length; j-- > 0; ) {
                    const xx = x + ox[j];
                    const yy = y + oy[j];
                    if (yy >= 0 && yy < height && xx >= 0 && xx < width) {
                        pixels[yy * width + xx] += (err * weights[j]) >> shift;
                    }
                }
            }
        }
        cimg.pixels.set(pixels);
        img.setChannel(cid, cimg);
    }
    return img;
};
