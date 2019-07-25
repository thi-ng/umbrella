import { set, setC4 } from "@thi.ng/vectors";
import { ColorOp } from "./api";

/**
 * RGBA only. Multiplies RGB channels w/ alpha channel. Assumes alpha is
 * in [0 .. 1] interval. Does NOT clamp result.
 *
 * @param out
 * @param src
 */
export const premultiply: ColorOp = (out, src) => {
    const a = src[3];
    return setC4(out || src, src[0] * a, src[1] * a, src[2] * a, a);
};

/**
 * Multiplies RGB channels of packed int with alpha channel.
 *
 * @param src
 */
export const premultiplyInt = (src: number) => {
    const a = (src >>> 24) / 0xff;
    return (
        (src & 0xff000000) |
        ((((src >>> 16) & 0xff) * a) << 16) |
        ((((src >>> 8) & 0xff) * a) << 8) |
        ((src & 0xff) * a)
    );
};

/**
 * RGBA only. Reverse operation of `premultiply`. Divides RGB channels
 * by alpha, unless alpha is zero. Does NOT clamp result.
 *
 * @param out
 * @param src
 */
export const postmultiply: ColorOp = (out, src) => {
    const a = src[3];
    return a > 0
        ? setC4(out || src, src[0] / a, src[1] / a, src[2] / a, a)
        : !out && out != src
        ? set(out, src)
        : src;
};

/**
 * Reverse op of `premultiplyInt`. Divides RGB channels by alpha (unless
 * zero) and DOES clamp result to avoid overflows.
 *
 * @param src
 */
export const postmultiplyInt = (src: number) => {
    const a = (src >>> 24) / 0xff;
    return a > 0
        ? (src & 0xff000000) |
              (Math.min(0xff, ((src >>> 16) & 0xff) / a) << 16) |
              (Math.min(0xff, ((src >>> 8) & 0xff) / a) << 8) |
              Math.min(0xff, (src & 0xff) / a)
        : src;
};
