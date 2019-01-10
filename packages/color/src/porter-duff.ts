import { setC4, setN4 } from "@thi.ng/vectors3";
import { Color, ReadonlyColor } from "./api";
import { postmultiply, premultiply } from "./premultiply";

// http://ssp.impulsetrain.com/porterduff.html
// https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending

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
    f: (s: number, d: number) => number,
    x: 0 | 1,
    y: 0 | 1,
    z: 0 | 1
) => {
    const dot = y ?
        z ?
            (s: number, d: number, sda: number, sy: number, sz: number) =>
                f(s, d) * sda + s * sy + d * sz :
            (s: number, d: number, sda: number, sy: number) =>
                f(s, d) * sda + s * sy :
        z ?
            (s: number, d: number, sda: number, _, sz: number) =>
                f(s, d) * sda + d * sz :
            (s: number, d: number, sda: number) =>
                f(s, d) * sda;
    return (out: Color, src: ReadonlyColor, dest: ReadonlyColor) => {
        const sa = src[3];
        const da = dest[3];
        const sda = sa * da;
        const sy = y * sa * (1 - da);
        const sz = z * da * (1 - sa);
        return setC4(
            out || dest,
            dot(src[0], dest[0], sda, sy, sz),
            dot(src[1], dest[1], sda, sy, sz),
            dot(src[2], dest[2], sda, sy, sz),
            x * sda + sy + sz
        );
    };
};

/**
 * Like `porterDuff`, but pre-multiplies alpha for both input colors and
 * then post-multiplies alpha to output.
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
    mode: (out: Color, src: ReadonlyColor, dest: ReadonlyColor) => Color
) =>
    postmultiply(null, mode(null, premultiply([], src), premultiply(out, dest)));

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
export const composeClear =
    (out: Color, _: ReadonlyColor, dest: ReadonlyColor) =>
        setN4(out || dest, 0);

/**
 * Porter-Duff operator. Always results in `src` color, `dest` ignored.
 *
 * @see porterDuff
 */
export const composeSrc = porterDuff((s) => s, 1, 1, 0);

/**
 * Porter-Duff operator. Always results in `dest` color, `src` ignored.
 *
 * @see porterDuff
 */
export const composeDest = porterDuff((_, d) => d, 1, 0, 1);

/**
 * Porter-Duff operator. The source color is placed over the destination
 * color.
 *
 * @see porterDuff
 */
export const composeSrcOver = porterDuff((s) => s, 1, 1, 1);

/**
 * Porter-Duff operator. The destination color is placed over the source
 * color.
 *
 * @see porterDuff
 */
export const composeDestOver = porterDuff((_, d) => d, 1, 1, 1);

/**
 * Porter-Duff operator. The source that overlaps the destination,
 * replaces the destination.
 *
 * @see porterDuff
 */
export const composeSrcIn = porterDuff((s) => s, 1, 0, 0);

/**
 * Porter-Duff operator. The destination that overlaps the source,
 * replaces the source.
 *
 * @see porterDuff
 */
export const composeDestIn = porterDuff((_, d) => d, 1, 0, 0);

/**
 * Porter-Duff operator. The source that does not overlap the
 * destination replaces the destination.
 *
 * @see porterDuff
 */
export const composeSrcOut = porterDuff((s) => s, 0, 1, 0);

/**
 * Porter-Duff operator. The destination that does not overlap the
 * source replaces the source.
 *
 * @see porterDuff
 */
export const composeDestOut = porterDuff((_, d) => d, 0, 0, 1);

/**
 * Porter-Duff operator. The source that overlaps the destination is
 * composited with the destination.
 *
 * @see porterDuff
 */
export const composeSrcAtop = porterDuff((s) => s, 1, 0, 1);

/**
 * Porter-Duff operator. The destination that overlaps the source is
 * composited with the source and replaces the destination.
 *
 * @see porterDuff
 */
export const composeDestAtop = porterDuff((_, d) => d, 1, 1, 0);

/**
 * Porter-Duff operator. The non-overlapping regions of source and
 * destination are combined.
 *
 * @see porterDuff
 */
export const composeXor = porterDuff(() => 0, 0, 1, 1);
