import { Color, ReadonlyColor } from "./api";
import { set } from "@thi.ng/vectors3/set";
import { setC4 } from "@thi.ng/vectors3/setc";

/**
 * RGBA only. Multiplies RGB channels w/ alpha channel. Assumes alpha is
 * in [0 .. 1] interval. Does NOT clamp result.
 *
 * @param out
 * @param src
 */
export const premultiply =
    (out: Color, src: ReadonlyColor) => {
        const a = src[3];
        return setC4(
            out || src,
            src[0] * a,
            src[1] * a,
            src[2] * a,
            a
        );
    };

/**
 * RGBA only. Reverse operation of `premultiply`. Divides RGB channels
 * by alpha, unless alpha is zero. Does NOT clamp result.
 *
 * @param out
 * @param src
 */
export const postmultiply =
    (out: Color, src: ReadonlyColor) => {
        const a = src[3];
        return a > 0 ?
            setC4(
                out || src,
                src[0] / a,
                src[1] / a,
                src[2] / a,
                a
            ) :
            !out && out != src ?
                set(out, src) :
                src;
    };
