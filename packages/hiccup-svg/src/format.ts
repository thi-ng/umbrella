import { isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { asCSS, ColorMode, ReadonlyColor } from "@thi.ng/color";
import { Vec2Like } from "./api";

let PRECISION = 2;

export const setPrecision = (n: number) => (PRECISION = n);

export const ff = (x: number) => x.toFixed(PRECISION);

export const fpoint = (p: Vec2Like) => ff(p[0]) + "," + ff(p[1]);

export const fpoints = (pts: Vec2Like[], sep = " ") =>
    pts ? pts.map(fpoint).join(sep) : "";

/**
 * Takes an attributes object and converts any `fill`, `stroke` or
 * transformation attributes, i.e. `transform`, `rotate`, `scale`,
 * `translate`. If the element has a `transform` attrib, conversion of
 * the other attribs will be skipped, else the values are assumed to be
 * either strings or:
 *
 * - `transform`: 6-element numeric array (mat23)
 * - `translate`: 2-element array
 * - `rotate`: number (angle in radians)
 * - `scale`: number (uniform scale) or 2-elem array
 *
 * If no `transform` is given, the resulting transformation order will
 * always be TRS. Any string values given will be used as-is and
 * therefore need to be complete, e.g. `{ rotate: "rotate(60)" }`
 *
 * For color related attribs (`fill`, `stroke`), if given value is
 * array-like or a number, it will be converted into a CSS color string
 * using thi.ng/color/asCSS.
 *
 * String color attribs prefixed with `$` are replaced with `url(#...)`
 * refs (used for gradients).
 *
 * Returns updated attribs or `undefined` if `attribs` itself is
 * null-ish.
 *
 * @param attribs
 */
export const fattribs = (attribs: any) => {
    if (!attribs) return;
    const res: any = ftransforms(attribs);
    let v: any;
    (v = attribs.fill) && (res.fill = fcolor(v));
    (v = attribs.stroke) && (res.stroke = fcolor(v));
    return res;
};

/**
 * Converts any transformation related attribs.
 *
 * @see fattribs
 *
 * @param attribs
 */
const ftransforms = (attribs: any) => {
    let v: any;
    if (
        (v = attribs.transform) ||
        attribs.translate ||
        attribs.scale ||
        attribs.rotate
    ) {
        if (v) {
            attribs.transform = !isString(v)
                ? `matrix(${[...v].map(ff).join(" ")})`
                : v;
            delete attribs.translate;
            delete attribs.rotate;
            delete attribs.scale;
        } else {
            const tx: string[] = [];
            if ((v = attribs.translate)) {
                tx.push(isString(v) ? v : `translate(${ff(v[0])} ${ff(v[1])})`);
                delete attribs.translate;
            }
            if ((v = attribs.rotate)) {
                tx.push(isString(v) ? v : `rotate(${ff((v * 180) / Math.PI)})`);
                delete attribs.rotate;
            }
            if ((v = attribs.scale)) {
                tx.push(
                    isString(v)
                        ? v
                        : isArrayLike(v)
                            ? `scale(${ff(v[0])} ${ff(v[1])})`
                            : `scale(${ff(v)})`
                );
                delete attribs.scale;
            }
            attribs.transform = tx.join(" ");
        }
    }
    return attribs;
};

/**
 * Attempts to convert a single color attrib value.
 *
 * @see fattribs
 *
 * @param col
 */
export const fcolor = (col: any) =>
    isString(col)
        ? col[0] === "$"
            ? `url(#${col.substr(1)})`
            : col
        : isArrayLike(col)
            ? isNumber((<any>col).mode)
                ? asCSS(<any>col)
                : asCSS(<ReadonlyColor>col, ColorMode.RGBA)
            : isNumber(col)
                ? asCSS(col, ColorMode.INT32)
                : col;
