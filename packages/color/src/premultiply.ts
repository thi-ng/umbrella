import { Color, ReadonlyColor } from "./api";
import { set } from "@thi.ng/vectors3/set";
import { setC4 } from "@thi.ng/vectors3/setc";

/**
 * Multiplies RGB channels w/ alpha channel.
 * Assumes alpha is in [0 .. 1] interval.
 *
 * @param out
 * @param rgba
 */
export const premultiply =
    (out: Color, rgba: ReadonlyColor) => {
        const a = rgba[3];
        return setC4(
            out || rgba,
            rgba[0] * a,
            rgba[1] * a,
            rgba[2] * a,
            a
        );
    };

/**
 * Reverse operation of `premultiply`. Divides RGB channels by alpha,
 * unless alpha is zero. Does NOT clamp result.
 *
 * @param out
 * @param rgba
 */
export const postmultiply =
    (out: Color, rgba: ReadonlyColor) => {
        const a = rgba[3];
        return a > 0 ?
            setC4(
                out || rgba,
                rgba[0] / a,
                rgba[1] / a,
                rgba[2] / a,
                a
            ) :
            !out && out != rgba ?
                set(out, rgba) :
                rgba;
    };
