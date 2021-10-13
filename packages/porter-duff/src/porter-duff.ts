import type { Fn3, FnN2 } from "@thi.ng/api";
import { clamp, clamp01 } from "@thi.ng/math/interval";
import type { Color, ReadonlyColor } from "./api.js";
import {
    postmultiply,
    postmultiplyInt,
    premultiply,
    premultiplyInt,
} from "./premultiply.js";
import { setC4, setN4 } from "./utils.js";

const min = Math.min;

export const ZERO: FnN2 = () => 0;
export const ONE: FnN2 = () => 1;
export const A: FnN2 = (a) => a;
export const B: FnN2 = (_, b) => b;
export const ONE_MINUS_A: FnN2 = (a) => 1 - a;
export const ONE_MINUS_B: FnN2 = (_, b) => 1 - b;

/**
 * General Porter-Duff HOF operator for **pre-multiplied** RGBA. Use
 * {@link porterDuffP} for applying pre & post multiplication of input
 * and output colors. The returned function takes 3 arguments:
 *
 * - `out` color (if `null` or `undefined` writes to `dest`)
 * - `src` color (background)
 * - `dest` color (foreground)
 *
 * Unlike the packed int version, here only the alpha channel of the
 * result color will be clamped. RGB components can potentially go out
 * of [0..1] range (depending on coefficient functions used).
 *
 * Reference:
 * {@link https://keithp.com/~keithp/porterduff/p253-porter.pdf}
 *
 * @param fa - fn for src coeff
 * @param fb - fn for dest coeff
 */
export const porterDuff =
    (fa: FnN2, fb: FnN2) =>
    (out: Color | null, src: ReadonlyColor, dest: ReadonlyColor) => {
        const sa = src[3];
        const sb = dest[3];
        const aa = fa(sa, sb);
        const bb = fb(sa, sb);
        return setC4(
            out || dest,
            src[0] * aa + dest[0] * bb,
            src[1] * aa + dest[1] * bb,
            src[2] * aa + dest[2] * bb,
            clamp01(src[3] * aa + dest[3] * bb)
        );
    };

export const porterDuffInt =
    (fa: FnN2, fb: FnN2): FnN2 =>
    (a, b) => {
        const sa = (a >>> 24) / 255;
        const sb = (b >>> 24) / 255;
        const aa = fa(sa, sb);
        const bb = fb(sa, sb);
        return (
            (clamp(
                ((a >>> 24) & 0xff) * aa + ((b >>> 24) & 0xff) * bb,
                0,
                255
            ) <<
                24) |
            (clamp(
                ((a >>> 16) & 0xff) * aa + ((b >>> 16) & 0xff) * bb,
                0,
                255
            ) <<
                16) |
            (clamp(((a >>> 8) & 0xff) * aa + ((b >>> 8) & 0xff) * bb, 0, 255) <<
                8) |
            clamp((a & 0xff) * aa + (b & 0xff) * bb, 0, 255)
        );
    };

/**
 * Higher order function. Takes existing PD operator and returns
 * function which accepts same args as the operator, but pre-multiplies
 * alpha for both input colors and then returns post-multiplied alpha
 * output.
 *
 * @param mode -
 */
export const porterDuffP =
    (mode: Fn3<Color | null, ReadonlyColor, ReadonlyColor, Color>) =>
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        postmultiply(
            null,
            mode(null, premultiply([], src), premultiply(out, dest))
        );

/**
 * Like {@link porterDuffP}, but for packed integers.
 *
 * @param mode -
 */
export const porterDuffPInt =
    (mode: FnN2): FnN2 =>
    (src, dest) =>
        postmultiplyInt(mode(premultiplyInt(src), premultiplyInt(dest)));

/**
 * Porter-Duff operator. None of the terms are used. Always results in
 * [0, 0, 0, 0].
 *
 * {@link porterDuff}
 *
 * @param out -
 * @param src -
 * @param dest -
 */
export const CLEAR_F = (out: Color, _: ReadonlyColor, dest: ReadonlyColor) =>
    setN4(out || dest, 0);

/**
 * Porter-Duff operator. Always results in `src` color, `dest` ignored.
 *
 * {@link porterDuff}
 */
export const SRC_F = porterDuff(ONE, ZERO);

/**
 * Porter-Duff operator. Always results in `dest` color, `src` ignored.
 *
 * {@link porterDuff}
 */
export const DEST_F = porterDuff(ZERO, ONE);

/**
 * Porter-Duff operator. The source color is placed over the destination
 * color.
 *
 * {@link porterDuff}
 */
export const SRC_OVER_F = porterDuff(ONE, ONE_MINUS_A);

/**
 * Porter-Duff operator. The destination color is placed over the source
 * color.
 *
 * {@link porterDuff}
 */
export const DEST_OVER_F = porterDuff(ONE_MINUS_B, ONE);

/**
 * Porter-Duff operator. The source that overlaps the destination,
 * replaces the destination.
 *
 * {@link porterDuff}
 */
export const SRC_IN_F = porterDuff(B, ZERO);

/**
 * Porter-Duff operator. The destination that overlaps the source,
 * replaces the source.
 *
 * {@link porterDuff}
 */
export const DEST_IN_F = porterDuff(ZERO, A);

/**
 * Porter-Duff operator. The source that does not overlap the
 * destination replaces the destination.
 *
 * {@link porterDuff}
 */
export const SRC_OUT_F = porterDuff(ONE_MINUS_B, ZERO);

/**
 * Porter-Duff operator. The destination that does not overlap the
 * source replaces the source.
 *
 * {@link porterDuff}
 */
export const DEST_OUT_F = porterDuff(ZERO, ONE_MINUS_A);

/**
 * Porter-Duff operator. The source that overlaps the destination is
 * composited with the destination.
 *
 * {@link porterDuff}
 */
export const SRC_ATOP_F = porterDuff(B, ONE_MINUS_A);

/**
 * Porter-Duff operator. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * {@link porterDuff}
 */
export const DEST_ATOP_F = porterDuff(ONE_MINUS_B, A);

/**
 * Porter-Duff operator. The non-overlapping regions of source and
 * destination are combined.
 *
 * {@link porterDuff}
 */
export const XOR_F = porterDuff(ONE_MINUS_B, ONE_MINUS_A);

/**
 * Porter-Duff operator. Source & destination regions are added.
 */
export const PLUS_F = porterDuff(ONE, ONE);

////////// Packed ARGB / ABGR versions //////////

export const CLEAR_I = ZERO;

/**
 * Porter-Duff operator for packed ints. Always results in `src` color, `dest` ignored.
 *
 * {@link porterDuff}
 */
export const SRC_I = porterDuffInt(ONE, ZERO);

/**
 * Porter-Duff operator for packed ints. Always results in `dest` color, `src` ignored.
 *
 * {@link porterDuff}
 */
export const DEST_I = porterDuffInt(ZERO, ONE);

/**
 * Porter-Duff operator for packed ints. The source color is placed over the destination
 * color.
 *
 * {@link porterDuff}
 */
export const SRC_OVER_I = porterDuffInt(ONE, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The destination color is placed over the source
 * color.
 *
 * {@link porterDuff}
 */
export const DEST_OVER_I = porterDuffInt(ONE_MINUS_B, ONE);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination,
 * replaces the destination.
 *
 * {@link porterDuff}
 */
export const SRC_IN_I = porterDuffInt(B, ZERO);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source,
 * replaces the source.
 *
 * {@link porterDuff}
 */
export const DEST_IN_I = porterDuffInt(ZERO, A);

/**
 * Porter-Duff operator for packed ints. The source that does not overlap the
 * destination replaces the destination.
 *
 * {@link porterDuff}
 */
export const SRC_OUT_I = porterDuffInt(ONE_MINUS_B, ZERO);

/**
 * Porter-Duff operator for packed ints. The destination that does not overlap the
 * source replaces the source.
 *
 * {@link porterDuff}
 */
export const DEST_OUT_I = porterDuffInt(ZERO, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination is
 * composited with the destination.
 *
 * {@link porterDuff}
 */
export const SRC_ATOP_I = porterDuffInt(B, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * {@link porterDuff}
 */
export const DEST_ATOP_I = porterDuffInt(ONE_MINUS_B, A);

/**
 * Porter-Duff operator for packed ints. The non-overlapping regions of source and
 * destination are combined.
 *
 * {@link porterDuff}
 */
export const XOR_I = porterDuffInt(ONE_MINUS_B, ONE_MINUS_A);

/**
 * Porter-Duff operator for packed ints. Source & destination regions
 * are added.
 */
export const PLUS_I = porterDuffInt(ONE, ONE);

/**
 * Porter-Duff darken modifier. Multiplies RGB components of `src` with
 * `t`. Alpha remains unchanged. Writes results to `out`, or if `null`
 * modifies `src` in-place.
 *
 * @param out -
 * @param src -
 * @param t -
 */
export const darken = (out: Color | null, src: ReadonlyColor, t: number) =>
    setC4(out || src, src[0] * t, src[1] * t, src[2] * t, src[3]);

/**
 * Porter-Duff dissolve modifier. Multiplies all components of `src`
 * with `t`. Clamps alpha to [0..1] range, RGB unclamped. Writes results
 * to `out`, or if `null` modifies `src` in-place.
 *
 * @param out -
 * @param src -
 * @param t -
 */
export const dissolve = (out: Color | null, src: ReadonlyColor, t: number) =>
    setC4(out || src, src[0] * t, src[1] * t, src[2] * t, min(1, src[3] * t));

/**
 * Porter-Duff opacity modifier. Multiplies alpha component of `src`
 * with `t`, clamped to [0..1] range. Writes results to `out`, or if
 * `null` modifies `src` in-place.
 *
 * @param out -
 * @param src -
 * @param t -
 */
export const opacity = (out: Color | null, src: ReadonlyColor, t: number) =>
    setC4(out || src, src[0], src[1], src[2], min(1, src[3] * t));

/**
 * Porter-Duff darken modifier for packed ints. Multiplies RGB
 * components of `src` with `t` ([0..1] range).
 *
 * @param src -
 * @param t -
 */
export const darkenInt: FnN2 = (src, t) =>
    (src & 0xff000000) |
    (min(0xff, ((src >>> 16) & 0xff) * t) << 16) |
    (min(0xff, ((src >>> 8) & 0xff) * t) << 8) |
    min(0xff, (src & 0xff) * t);

/**
 * Porter-Duff dissolve modifier for packed ints. Multiplies all
 * components of `src` with `t` ([0..1] range).
 *
 * @param src -
 * @param t -
 */
export const dissolveInt: FnN2 = (src, t) =>
    (min(0xff, ((src >>> 24) & 0xff) * t) << 24) |
    (min(0xff, ((src >>> 16) & 0xff) * t) << 16) |
    (min(0xff, ((src >>> 8) & 0xff) * t) << 8) |
    min(0xff, (src & 0xff) * t);

/**
 * Porter-Duff opacity modifier for packed ints. Multiplies alpha
 * component of `src` with `t` ([0..1] range).
 *
 * @param src -
 * @param t -
 */
export const opacityInt: FnN2 = (src, t) =>
    (min(0xff, ((src >>> 24) & 0xff) * t) << 24) | (src & 0xffffff);
