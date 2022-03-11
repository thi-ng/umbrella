import type { NormalMapOpts } from "./api.js";
import { ensureChannel } from "./checks.js";
import { convolveChannel } from "./convolve.js";
import { FloatBuffer } from "./float.js";
import { FLOAT_NORMAL } from "./format/float-norm.js";
import { __asVec } from "./internal/utils.js";

/**
 * Computes normal map image (aka gradient in X & Y directions and a static Z
 * value) for a single channel in given {@link FloatBuffer}. The resulting
 * buffer will use the {@link FLOAT_NORMAL} format, storing the horizontal
 * gradient in the 1st channel (red), vertical gradient in the 2nd channel
 * (green) and sets last channel to given `z` value (blue).
 *
 * @remarks
 * The gradient values will be scaled with `scale` (default: 1, but supports
 * individual X/Y factors). Gradient values will be signed.
 *
 * The partial gradients of the last column/row will be set to zero
 * (respectively). I.e. the right most pixel column will have `red = 0` and last
 * row will have `green = 0`.
 *
 * @param src - 
 * @param opts - 
 */
export const normalMap = (src: FloatBuffer, opts?: Partial<NormalMapOpts>) => {
    const { channel, step, scale, z } = {
        channel: 0,
        step: 0,
        scale: 1,
        z: 1,
        ...opts,
    };
    ensureChannel(src.format, channel);
    const spec = [-1, ...new Array(step).fill(0), 1];
    const [sx, sy] = __asVec(scale);
    const dest = new FloatBuffer(src.width, src.height, FLOAT_NORMAL);
    dest.setChannel(
        0,
        convolveChannel(src, {
            kernel: { spec, size: [step + 2, 1] },
            scale: sx,
            channel,
        })
    );
    dest.setChannel(
        1,
        convolveChannel(src, {
            kernel: { spec, size: [1, step + 2] },
            scale: sy,
            channel,
        })
    );
    dest.setChannel(2, z);
    return dest;
};
