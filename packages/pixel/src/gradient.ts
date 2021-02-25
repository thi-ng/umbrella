import { isNumber } from "@thi.ng/checks";
import { FloatBuffer } from "./float";
import { FLOAT_NORMAL } from "./format/float-norm";
import { ensureChannel } from "./utils";

interface GradientImageOpts {
    channel: number;
    scale: number | [number, number];
    z: number;
}

/**
 * Computes gradient image (aka normal map) in X & Y directions for a single
 * channel in given {@link FloatBuffer}. The resulting buffer will use the
 * {@link FLOAT_NORMAL} format, storing the horizontal gradient in the 1st
 * channel (red), vertical gradient in the 2nd channel (green) and sets last
 * channel to given `z` value (blue).
 *
 * @remarks
 * The gradient values will be scaled with `scale` (default: 1). Gradient values
 * will be signed and should be in [-1..1] interval if the image is to be later
 * converted back into an integer format.
 *
 * The partial gradients of the last column/row will be set to zero
 * (respectively). I.e. the right most pixel column will have `red = 0` and last
 * row will have `green = 0`.
 *
 * @param src
 * @param id
 * @param opts
 */
export const gradientImage = (
    src: FloatBuffer,
    opts?: Partial<GradientImageOpts>
) => {
    const { channel, scale, z } = {
        channel: 0,
        scale: [1, 1],
        z: 1,
        ...opts,
    };
    ensureChannel(src.format, channel);
    const { pixels: spix, width, height, stride, rowStride } = src;
    const dest = new FloatBuffer(width, height, FLOAT_NORMAL);
    const dpix = dest.pixels;
    const w1 = width - 1;
    const h1 = height - 1;
    const [sx, sy] = isNumber(scale) ? [scale, scale] : scale;
    for (let y = 0, i = 0, j = channel; y < height; y++) {
        for (let x = 0; x < width; x++, i += 3, j += stride) {
            const base = spix[j];
            dpix[i] = x < w1 ? (spix[j + stride] - base) * sx : 0;
            dpix[i + 1] = y < h1 ? (spix[j + rowStride] - base) * sy : 0;
            dpix[i + 2] = z;
        }
    }
    return dest;
};
