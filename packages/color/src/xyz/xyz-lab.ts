import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ColorOp, ReadonlyColor } from "../api";
import { D50, D65 } from "../api/constants";
import { __ensureAlpha } from "../internal/ensure";

/** @internal */
const transform = (x: number) =>
    x > 0.00885645 ? Math.cbrt(x) : 7.787037 * x + 16 / 116;

/**
 * Converts XYZ to Lab, using provided reference white point (default:
 * {@link D50}). Also see {@link xyzLabD65}.
 *
 * @remarks
 * Important: We're using a normalized Lab space w/ all three coordinates
 * divided by 100 (normalized to 100% luminance).
 *
 * @param out
 * @param src
 * @param white
 */
export const xyzLab = (out: Color | null, src: ReadonlyColor, white = D50) => {
    const x = transform(src[0] / white[0]);
    const y = transform(src[1] / white[1]);
    const z = transform(src[2] / white[2]);
    return setC4(
        out || src,
        1.16 * y - 0.16,
        5.0 * (x - y),
        2.0 * (y - z),
        __ensureAlpha(src[3])
    );
};

/**
 * Same as {@link xyzLab}, but hard coded to use {@link D65} white point.
 *
 * @param out
 * @param src
 */
export const xyzLabD65: ColorOp = (out, src) => xyzLab(out, src, D65);
