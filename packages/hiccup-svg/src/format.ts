import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isString } from "@thi.ng/checks/is-string";
import { css } from "@thi.ng/color/css/css";
import type { Vec2Like } from "./api.js";

let PRECISION = 2;

export const setPrecision = (n: number) => (PRECISION = n);

/** @internal */
export const ff = (x: number) => (x === (x | 0) ? x : x.toFixed(PRECISION));

/** @internal */
export const fpoint = (p: Vec2Like) => ff(p[0]) + "," + ff(p[1]);

/** @internal */
export const fpoints = (pts: Vec2Like[], sep = " ") =>
    pts ? pts.map(fpoint).join(sep) : "";

/**
 * Takes an attributes object and a number of attrib IDs whose values should be
 * formatted using {@link ff}. Mutates and returns `attribs` object.
 *
 * @param attribs
 * @param ids
 */
export const numericAttribs = (attribs: any, ...ids: string[]) => {
    let v: any;
    for (let id of ids) {
        typeof (v = attribs[id]) === "number" && (attribs[id] = ff(v));
    }
    return attribs;
};

/**
 * Takes an attributes object and converts any `fill`, `stroke` or
 * transformation attributes, i.e. `transform`, `rotate`, `scale`, `translate`.
 *
 * @remarks
 * If the element has a `transform` attrib, conversion of the other attribs will
 * be skipped, else the values are assumed to be either strings or:
 *
 * - `transform`: 6-element numeric array (mat23)
 * - `translate`: 2-element array
 * - `rotate`: number (angle in radians)
 * - `scale`: number (uniform scale) or 2-elem array
 *
 * If no `transform` is given, the resulting transformation order will always be
 * TRS. Any string values given will be used as-is and therefore need to be
 * complete, e.g. `{ rotate: "rotate(60)" }`
 *
 * For color related attribs (`fill`, `stroke`), if given value is array-like, a
 * number or an {@link @thi.ng/color#IColor} instance, it will be converted into
 * a CSS color string using {@link @thi.ng/color#asCSS}.
 *
 * String color attribs prefixed with `$` are replaced with `url(#...)` refs
 * (used for referencing gradients).
 *
 * Returns updated attribs or `undefined` if `attribs` itself is null-ish.
 *
 * @param attribs - attributes object
 *
 * @internal
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
 * {@link fattribs}
 *
 * @param attribs - attributes object
 *
 * @internal
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
            attribs.transform = buildTransform(attribs);
        }
    }
    return attribs;
};

const buildTransform = (attribs: any) => {
    const tx: string[] = [];
    let v: any;
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
    return tx.join(" ");
};

/**
 * Attempts to convert a single color attrib value. If `col` is prefixed with
 * `$`, the value will be converted into a `url(#...)` reference.
 *
 * {@link fattribs}
 *
 * @param col - color value
 *
 * @internal
 */
export const fcolor = (col: any) =>
    isString(col)
        ? col[0] === "$"
            ? `url(#${col.substr(1)})`
            : col
        : css(col);

export const withoutKeys = (src: any, keys: Set<PropertyKey>) => {
    const dest: any = {};
    for (let k in src) {
        src.hasOwnProperty(k) && !keys.has(k) && (dest[k] = src[<any>k]);
    }
    return dest;
};
