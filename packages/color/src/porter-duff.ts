import { setC4 } from "@thi.ng/vectors3/setc";
import { setN4 } from "@thi.ng/vectors3/setn";
import { Color, ReadonlyColor } from "./api";
import { postmultiply, premultiply } from "./premultiply";

// http://ssp.impulsetrain.com/porterduff.html
// https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending

/**
 * General Porter-Duff operator for **pre-multiplied** RGBA. Use
 * `porderDiffP` for applying pre & post multiplication of input and
 * output colors.
 *
 * Reference:
 * https://drafts.fxtf.org/compositing-1/#advancedcompositing
 * http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap
 *
 * @param out writes to `dest` if null
 * @param src
 * @param dest
 * @param f blend function
 * @param x factor of "both" region
 * @param y factor of "src" region
 * @param z factor of "dest" region
 */
export const porterDuff = (
    out: Color,
    src: ReadonlyColor,
    dest: ReadonlyColor,
    f: (s: number, d: number) => number,
    x: 0 | 1,
    y: 0 | 1,
    z: 0 | 1
): Color => {
    const sa = src[3];
    const da = dest[3];
    const sda = sa * da;
    const sy = y * sa * (1 - da);
    const sz = z * da * (1 - sa);
    const dot = y ?
        z ?
            (s: number, d: number) => f(s, d) * sda + s * sy + d * sz :
            (s: number, d: number) => f(s, d) * sda + s * sy :
        z ?
            (s: number, d: number) => f(s, d) * sda + d * sz :
            (s: number, d: number) => f(s, d) * sda;
    return setC4(
        out || dest,
        dot(src[0], dest[0]),
        dot(src[1], dest[1]),
        dot(src[2], dest[2]),
        x * sda + sy + sz
    );
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
    mode: (out: Color, _: ReadonlyColor, dest: ReadonlyColor) => Color
) =>
    postmultiply(null, mode(null, premultiply([], src), premultiply(out, dest)));

export const clear =
    (out: Color, _: ReadonlyColor, dest: ReadonlyColor) =>
        setN4(out || dest, 0);

export const src =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (s) => s, 1, 1, 0);

export const dest =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (_, d) => d, 1, 0, 1);

export const srcOver =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (s) => s, 1, 1, 1);

export const destOver =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (_, d) => d, 1, 1, 1);

export const srcIn =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (s) => s, 1, 0, 0);

export const destIn =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (_, d) => d, 1, 0, 0);

export const srcOut =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (s) => s, 0, 1, 0);

export const destOut =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (_, d) => d, 0, 0, 1);

export const srcAtop =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (s) => s, 1, 0, 1);

export const destAtop =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, (_, d) => d, 1, 1, 0);

export const xor =
    (out: Color, src: ReadonlyColor, dest: ReadonlyColor) =>
        porterDuff(out, src, dest, () => 0, 0, 1, 1);
