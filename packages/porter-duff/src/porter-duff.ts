import { Fn2, Fn3 } from "@thi.ng/api";
import { Color, ReadonlyColor } from "./api";
import {
    postmultiply,
    postmultiplyInt,
    premultiply,
    premultiplyInt
} from "./premultiply";
import { setC4, setN4 } from "./utils";

const min = Math.min;

export const ZERO = () => 0;
export const ONE = () => 1;
export const A = (a: number) => a;
export const B = (_: number, b: number) => b;
export const ONE_MINUS_A = (a: number) => 1 - a;
export const ONE_MINUS_B = (_: number, b: number) => 1 - b;

/**
 * General Porter-Duff HOF operator for **pre-multiplied** RGBA. Use
 * `porderDiffP` for applying pre & post multiplication of input and
 * output colors. The returned function takes 3 arguments:
 *
 * - `out` color (if `null` or `undefined` writes to `dest`)
 * - `src` color (background)
 * - `dest` color (foreground)
 *
 * Reference:
 * https://keithp.com/~keithp/porterduff/p253-porter.pdf
 * https://drafts.fxtf.org/compositing-1/#advancedcompositing
 * http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap
 *
 * @param fa fn for src coeff
 * @param fb fn for dest coeff
 */
export const porterDuff = (
    fa: Fn2<number, number, number>,
    fb: Fn2<number, number, number>
) => (out: Color | null, src: ReadonlyColor, dest: ReadonlyColor) => {
    const sa = src[3] / 255;
    const sb = dest[3] / 255;
    const aa = fa(sa, sb);
    const bb = fb(sa, sb);
    return setC4(
        out || dest,
        src[0] * aa + dest[0] * bb,
        src[1] * aa + dest[1] * bb,
        src[2] * aa + dest[2] * bb,
        min(1, src[3] * aa + dest[3] * bb)
    );
};

export const porterDuffInt = (
    fa: Fn2<number, number, number>,
    fb: Fn2<number, number, number>
) => (a: number, b: number) => {
    const sa = (a >>> 24) / 255;
    const sb = (b >>> 24) / 255;
    const aa = fa(sa, sb);
    const bb = fb(sa, sb);
    const $ = aa
        ? bb
            ? (shift: number) =>
                  min(
                      255,
                      ((a >>> shift) & 0xff) * aa + ((b >>> shift) & 0xff) * bb
                  ) << shift
            : (shift: number) => min(255, ((a >>> shift) & 0xff) * aa) << shift
        : bb
        ? (shift: number) => min(255, ((b >>> shift) & 0xff) * bb) << shift
        : () => 0;
    return ($(24) | $(16) | $(8) | $(0)) >>> 0;
};

/**
 * Higher order function. Takes existing PD operator and returns
 * function which accepts same args as the operator, but pre-multiplies
 * alpha for both input colors and then returns post-multiplied alpha
 * output.
 *
 * @param mode
 */
export const porterDuffP = (
    mode: Fn3<Color | null, ReadonlyColor, ReadonlyColor, Color>
) => (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
    postmultiply(
        null,
        mode(null, premultiply([], src), premultiply(out, dest))
    );

/**
 * Like `porterDuffP`, but for packed integers.
 *
 * @param mode
 */
export const porterDuffPInt = (mode: Fn2<number, number, number>) => (
    src: number,
    dest: number
) => postmultiplyInt(mode(premultiplyInt(src), premultiplyInt(dest)));

/**
 * Porter-Duff operator. None of the terms are used. Always results in
 * [0, 0, 0, 0].
 *
 * @see porterDuff
 *
 * @param out
 * @param src
 * @param dest
 */
export const CLEAR = (out: Color, _: ReadonlyColor, dest: ReadonlyColor) =>
    setN4(out || dest, 0);

/**
 * Porter-Duff operator. Always results in `src` color, `dest` ignored.
 *
 * @see porterDuff
 */
export const SRC_F = porterDuff(ONE, ZERO);

/**
 * Porter-Duff operator. Always results in `dest` color, `src` ignored.
 *
 * @see porterDuff
 */
export const DEST_F = porterDuff(ZERO, ONE);

/**
 * Porter-Duff operator. The source color is placed over the destination
 * color.
 *
 * @see porterDuff
 */
export const SRC_OVER_F = porterDuff(ONE, ONE_MINUS_A);

/**
 * Porter-Duff operator. The destination color is placed over the source
 * color.
 *
 * @see porterDuff
 */
export const DEST_OVER_F = porterDuff(ONE_MINUS_B, ONE);

/**
 * Porter-Duff operator. The source that overlaps the destination,
 * replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_IN_F = porterDuff(B, ZERO);

/**
 * Porter-Duff operator. The destination that overlaps the source,
 * replaces the source.
 *
 * @see porterDuff
 */
export const DEST_IN_F = porterDuff(ZERO, A);

/**
 * Porter-Duff operator. The source that does not overlap the
 * destination replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_OUT_F = porterDuff(ONE_MINUS_B, ZERO);

/**
 * Porter-Duff operator. The destination that does not overlap the
 * source replaces the source.
 *
 * @see porterDuff
 */
export const DEST_OUT_F = porterDuff(ZERO, ONE_MINUS_A);

/**
 * Porter-Duff operator. The source that overlaps the destination is
 * composited with the destination.
 *
 * @see porterDuff
 */
export const SRC_ATOP_F = porterDuff(B, ONE_MINUS_A);

/**
 * Porter-Duff operator. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * @see porterDuff
 */
export const DEST_ATOP_F = porterDuff(ONE_MINUS_B, A);

/**
 * Porter-Duff operator. The non-overlapping regions of source and
 * destination are combined.
 *
 * @see porterDuff
 */
export const XOR_F = porterDuff(ONE_MINUS_B, ONE_MINUS_A);

/**
 * Porter-Duff operator. Source & destination regions are added.
 */
export const PLUS_F = porterDuff(ONE, ONE);

////////// Packed ARGB / ABGR versions //////////

export const CLEAR_I: Fn2<number, number, number> = () => 0;

/**
 * Porter-Duff operator for packed ints. Always results in `src` color, `dest` ignored.
 *
 * @see porterDuff
 */
export const SRC_I = porterDuffInt(ONE, ZERO);

/**
 * Porter-Duff operator for packed ints. Always results in `dest` color, `src` ignored.
 *
 * @see porterDuff
 */
export const DEST_I = porterDuffInt(ZERO, ONE);

/**
 * Porter-Duff operator for packed ints. The source color is placed over the destination
 * color.
 *
 * @see porterDuff
 */
export const SRC_OVER_I = porterDuffInt(ONE, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The destination color is placed over the source
 * color.
 *
 * @see porterDuff
 */
export const DEST_OVER_I = porterDuffInt(ONE_MINUS_B, ONE);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination,
 * replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_IN_I = porterDuffInt(B, ZERO);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source,
 * replaces the source.
 *
 * @see porterDuff
 */
export const DEST_IN_I = porterDuffInt(ZERO, A);

/**
 * Porter-Duff operator for packed ints. The source that does not overlap the
 * destination replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_OUT_I = porterDuffInt(ONE_MINUS_B, ZERO);

/**
 * Porter-Duff operator for packed ints. The destination that does not overlap the
 * source replaces the source.
 *
 * @see porterDuff
 */
export const DEST_OUT_I = porterDuffInt(ZERO, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination is
 * composited with the destination.
 *
 * @see porterDuff
 */
export const SRC_ATOP_I = porterDuffInt(B, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * @see porterDuff
 */
export const DEST_ATOP_I = porterDuffInt(ONE_MINUS_B, A);

/**
 * Porter-Duff operator for packed ints. The non-overlapping regions of source and
 * destination are combined.
 *
 * @see porterDuff
 */
export const XOR_I = porterDuffInt(ONE_MINUS_B, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. Source & destination regions
 * are added.
 */
export const PLUS_I = porterDuffInt(ONE, ONE);
