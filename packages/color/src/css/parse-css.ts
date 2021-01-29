import type { IDeref } from "@thi.ng/api";
import { assert } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { illegalArgs, unsupported } from "@thi.ng/errors";
import { clamp01, TAU } from "@thi.ng/math";
import { IParsedColor, ParsedColor } from "../api";
import { CSS_NAMES } from "../api/names";
import { CSS_SYSTEM_COLORS } from "../api/system";
import { int32Srgb } from "../int/int-srgb";
import { ensureHue } from "../internal/ensure-hue";

/**
 * Attempts to parse given CSS color into a {@link SRGBA}, {@link HSLA},
 * {@link LAB} or {@link LCH} color type. Throws an error if any of the
 * validations during parsing failed.
 *
 * @remarks
 * The following syntax versions are supported:
 *
 * - CSS named colors
 * - CSS system colors @see {@link CSS_SYSTEM_COLORS}
 * - hex3/4/6/8
 * - `rgb(r% g% b% / a%?)`
 * - `rgb(r g b / a?)`
 * - `rgb(r,g,b)`
 * - `rgba(r,g,b,a)`
 * - `hsl(h s% l% / a%?)`
 * - `hsl(h,s%,l%)`
 * - `hsla(h,s%,l%,a)`
 * - `lab(l a b / alpha?)`
 * - `lch(l c h / alpha?)`
 *
 * Hue values can be given according to CSS Color L4 spec (raw, deg, rad, grad,
 * turn): https://drafts.csswg.org/css-color/#typedef-hue
 *
 * If no alpha channel is given, it will default to 1.0 (fully opaque).
 *
 * Note that any named CSS or RGB colors will be returned as SRGBA instance. In
 * former versions of this library (pre 3.0.0), there was only a single RGB(A)
 * type with undefined behaviour re: linear or gamma-corrected versions. Since
 * v3.0.0, {@link RGBA} is only used for linear and {@link SRGB} for non-linear
 * RGB colors.
 *
 * @param src
 */
export const parseCss = (src: string | IDeref<string>): IParsedColor => {
    src = (isString(src) ? src : src.deref()).toLowerCase();
    const named = (<any>CSS_NAMES)[src] || (<any>CSS_SYSTEM_COLORS)[src];
    if (named || src[0] === "#")
        return new ParsedColor("srgb", int32Srgb([], parseHex(named || src)));
    const parts = src.split(/[(),/ ]+/);
    const [mode, a, b, c, d] = parts;
    assert(
        parts.length === 5 || parts.length === 6,
        `invalid ${mode} color: ${src}`
    );
    switch (mode) {
        case "rgb":
        case "rgba":
            return new ParsedColor("srgb", [
                parseNumOrPercent(a),
                parseNumOrPercent(b),
                parseNumOrPercent(c),
                parseAlpha(d),
            ]);
        case "hsl":
        case "hsla":
            return new ParsedColor("hsl", [
                parseHue(a),
                parsePercent(b),
                parsePercent(c),
                parseAlpha(d),
            ]);
        case "lab":
            return new ParsedColor("lab", [
                parsePercent(a),
                parseNumber(b) * 0.01,
                parseNumber(c) * 0.01,
                parseAlpha(d),
            ]);
        case "lch":
            return new ParsedColor("lch", [
                parsePercent(a),
                parseNumber(b) * 0.01,
                parseHue(c),
                parseAlpha(d),
            ]);
        default:
            unsupported(`color mode: ${mode}`);
    }
};

const parseHue = (x: string) => {
    const match = /^(-?[0-9.]+)(deg|rad|grad|turn)?$/.exec(x);
    assert(!!match, `expected hue, got: ${x}`);
    const hue = parseFloat(match![1]);
    switch (match![2]) {
        case "rad":
            return ensureHue(hue / TAU);
        case "grad":
            return ensureHue(hue / 400);
        case "turn":
            return ensureHue(hue);
        case "deg":
        default:
            return ensureHue(hue / 360);
    }
};

const parseAlpha = (x?: string) => (x ? clamp01(parseNumOrPercent(x, 1)) : 1);

const parsePercent = (x: string) => {
    assert(/^([0-9.]+)%$/.test(x), `expected percentage, got: ${x}`);
    return parseFloat(x) / 100;
};

const parseNumber = (x: string) => {
    assert(/^-?[0-9.]+$/.test(x), `expected number, got: ${x}`);
    return parseFloat(x);
};

const parseNumOrPercent = (x: string, norm = 255) => {
    assert(/^[0-9.]+%?$/.test(x), `expected number or percentage, got: ${x}`);
    return parseFloat(x) / (x.endsWith("%") ? 100 : norm);
};

export const parseHex = (src: string): number => {
    const match = /^#?([0-9a-f]{3,8})$/i.exec(src);
    if (match) {
        const hex = match[1];
        switch (hex.length) {
            case 3: {
                const [r, g, b] = hex;
                return (
                    (parseInt(`${r}${r}${g}${g}${b}${b}`, 16) | 0xff000000) >>>
                    0
                );
            }
            case 4: {
                const [a, r, g, b] = hex;
                return parseInt(`${a}${a}${r}${r}${g}${g}${b}${b}`, 16) >>> 0;
            }
            case 6:
                return (parseInt(hex, 6) | 0xff000000) >>> 0;
            case 8:
                return parseInt(hex, 16) >>> 0;
            default:
        }
    }
    return illegalArgs(`invalid hex color: "${src}"`);
};
