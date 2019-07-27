import { Fn2, Fn3, Fn5 } from "@thi.ng/api";
import { Color, ReadonlyColor } from "./api";
import {
    postmultiply,
    postmultiplyInt,
    premultiply,
    premultiplyInt
} from "./premultiply";
import { setC4, setN4 } from "./utils";

const min = Math.min;

const porterDuffOp = (
    f: Fn2<number, number, number>,
    y: 0 | 1,
    z: 0 | 1,
    max: number
): Fn5<number, number, number, number, number, number> =>
    y
        ? z
            ? (s, d, sda, sy, sz) => min(max, f(s, d) * sda + s * sy + d * sz)
            : (s, d, sda, sy) => min(max, f(s, d) * sda + s * sy)
        : z
        ? (s, d, sda, _, sz) => min(max, f(s, d) * sda + d * sz)
        : (s, d, sda) => f(s, d) * sda;

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
 * https://drafts.fxtf.org/compositing-1/#advancedcompositing
 * http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap
 *
 * @param f blend function
 * @param x factor of "both" region
 * @param y factor of "src" region
 * @param z factor of "dest" region
 */
export const porterDuff = (
    f: Fn2<number, number, number>,
    x: 0 | 1,
    y: 0 | 1,
    z: 0 | 1
) => {
    const op = porterDuffOp(f, y, z, 1);
    return (out: Color | null, src: ReadonlyColor, dest: ReadonlyColor) => {
        const sa = src[3];
        const da = dest[3];
        const sda = sa * da;
        const sy = y * sa * (1 - da);
        const sz = z * da * (1 - sa);
        return setC4(
            out || dest,
            op(src[0], dest[0], sda, sy, sz),
            op(src[1], dest[1], sda, sy, sz),
            op(src[2], dest[2], sda, sy, sz),
            min(1, x * sda + sy + sz)
        );
    };
};

export const porterDuffInt = (
    f: Fn2<number, number, number>,
    x: 0 | 1,
    y: 0 | 1,
    z: 0 | 1
) => {
    const op = porterDuffOp(f, y, z, 255);
    return (src: number, dest: number) => {
        const sa = (src >>> 24) / 255;
        const da = (dest >>> 24) / 255;
        const sda = sa * da;
        const sy = y * sa * (1 - da);
        const sz = z * da * (1 - sa);
        return (
            ((min(255, (x * sda + sy + sz) * 255) << 24) |
                (op((src >>> 16) & 0xff, (dest >>> 16) & 0xff, sda, sy, sz) <<
                    16) |
                (op((src >>> 8) & 0xff, (dest >>> 8) & 0xff, sda, sy, sz) <<
                    8) |
                op(src & 0xff, dest & 0xff, sda, sy, sz)) >>>
            0
        );
    };
};

/**
 * Similar to `porterDuff`, but takes existing PD operator,
 * pre-multiplies alpha for both input colors and then post-multiplies
 * alpha to output.
 *
 * @param out
 * @param src
 * @param dest
 * @param mode
 */
export const porterDuffP = (
    out: Color,
    src: ReadonlyColor,
    dest: ReadonlyColor,
    mode: Fn3<Color | null, ReadonlyColor, ReadonlyColor, Color>
) =>
    postmultiply(
        null,
        mode(null, premultiply([], src), premultiply(out, dest))
    );

/**
 * Like `porterDuffP`, but for packed integers.
 *
 * @param src
 * @param dest
 * @param mode
 */
export const porterDuffPInt = (
    src: number,
    dest: number,
    mode: Fn2<number, number, number>
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

const FS = (s: number) => s;
const FD = (_: number, d: number) => d;

/**
 * Porter-Duff operator. Always results in `src` color, `dest` ignored.
 *
 * @see porterDuff
 */
export const SRC_F = porterDuff(FS, 1, 1, 0);

/**
 * Porter-Duff operator. Always results in `dest` color, `src` ignored.
 *
 * @see porterDuff
 */
export const DEST_F = porterDuff(FD, 1, 0, 1);

/**
 * Porter-Duff operator. The source color is placed over the destination
 * color.
 *
 * @see porterDuff
 */
export const SRC_OVER_F = porterDuff(FS, 1, 1, 1);

/**
 * Porter-Duff operator. The destination color is placed over the source
 * color.
 *
 * @see porterDuff
 */
export const DEST_OVER_F = porterDuff(FD, 1, 1, 1);

/**
 * Porter-Duff operator. The source that overlaps the destination,
 * replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_IN_F = porterDuff(FS, 1, 0, 0);

/**
 * Porter-Duff operator. The destination that overlaps the source,
 * replaces the source.
 *
 * @see porterDuff
 */
export const DEST_IN_F = porterDuff(FD, 1, 0, 0);

/**
 * Porter-Duff operator. The source that does not overlap the
 * destination replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_OUT_F = porterDuff(FS, 0, 1, 0);

/**
 * Porter-Duff operator. The destination that does not overlap the
 * source replaces the source.
 *
 * @see porterDuff
 */
export const DEST_OUT_F = porterDuff(FD, 0, 0, 1);

/**
 * Porter-Duff operator. The source that overlaps the destination is
 * composited with the destination.
 *
 * @see porterDuff
 */
export const SRC_ATOP_F = porterDuff(FS, 1, 0, 1);

/**
 * Porter-Duff operator. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * @see porterDuff
 */
export const DEST_ATOP_F = porterDuff(FD, 1, 1, 0);

/**
 * Porter-Duff operator. The non-overlapping regions of source and
 * destination are combined.
 *
 * @see porterDuff
 */
export const XOR_F = porterDuff(() => 0, 0, 1, 1);

////////// Packed ARGB / ABGR versions //////////

export const CLEAR_I = () => 0;

/**
 * Porter-Duff operator for packed ints. Always results in `src` color, `dest` ignored.
 *
 * @see porterDuff
 */
export const SRC_I = porterDuffInt(FS, 1, 1, 0);

/**
 * Porter-Duff operator for packed ints. Always results in `dest` color, `src` ignored.
 *
 * @see porterDuff
 */
export const DEST_I = porterDuffInt(FD, 1, 0, 1);

/**
 * Porter-Duff operator for packed ints. The source color is placed over the destination
 * color.
 *
 * @see porterDuff
 */
export const SRC_OVER_I = porterDuffInt(FS, 1, 1, 1);

/**
 * Porter-Duff operator for packed ints. The destination color is placed over the source
 * color.
 *
 * @see porterDuff
 */
export const DEST_OVER_I = porterDuffInt(FD, 1, 1, 1);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination,
 * replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_IN_I = porterDuffInt(FS, 1, 0, 0);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source,
 * replaces the source.
 *
 * @see porterDuff
 */
export const DEST_IN_I = porterDuffInt(FD, 1, 0, 0);

/**
 * Porter-Duff operator for packed ints. The source that does not overlap the
 * destination replaces the destination.
 *
 * @see porterDuff
 */
export const SRC_OUT_I = porterDuffInt(FS, 0, 1, 0);

/**
 * Porter-Duff operator for packed ints. The destination that does not overlap the
 * source replaces the source.
 *
 * @see porterDuff
 */
export const DEST_OUT_I = porterDuffInt(FD, 0, 0, 1);

/**
 * Porter-Duff operator for packed ints. The source that overlaps the destination is
 * composited with the destination.
 *
 * @see porterDuff
 */
export const SRC_ATOP_I = porterDuffInt(FS, 1, 0, 1);

/**
 * Porter-Duff operator for packed ints. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * @see porterDuff
 */
export const DEST_ATOP_I = porterDuffInt(FD, 1, 1, 0);

/**
 * Porter-Duff operator for packed ints. The non-overlapping regions of source and
 * destination are combined.
 *
 * @see porterDuff
 */
export const XOR_I = porterDuffInt(() => 0, 0, 1, 1);
