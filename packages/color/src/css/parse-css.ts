import type { IDeref } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import { interleave4_12_24, interleave4_16_32 } from "@thi.ng/binary/splat";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { IParsedColor, ParsedColor } from "../api";
import { CSS_NAMES } from "../api/names";
import { CSS_SYSTEM_COLORS } from "../api/system";
import { intArgb32Srgb } from "../int/int-srgb";

/**
 * Attempts to parse given CSS color into an interim {@link ParsedColor} type
 * with {@link srgb}, {@link hsl}, {@link labD50} or {@link lch} color modes.
 * Throws an error if any of the validations during parsing failed.
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
 * turn): https://www.w3.org/TR/css-color-4/#typedef-hue
 *
 * If no alpha channel is given, it will default to 1.0 (fully opaque).
 *
 * Note that any named or system CSS colors, hex colors and any RGB colors will
 * be returned as sRGB instance. In former versions of this library (pre 3.0.0),
 * there was only a single RGB type with undefined behaviour re: linear or
 * gamma-encoded versions. Since v3.0.0, {@link rgb} is only used for _linear_
 * and {@link srgb} for non-linear (gamma encoded) RGB colors (CSS uses sRGB by
 * default).
 *
 * @param src
 */
export const parseCss = (src: string | IDeref<string>): IParsedColor => {
    src = (isString(src) ? src : src.deref()).toLowerCase();
    const named = (<any>CSS_NAMES)[src] || (<any>CSS_SYSTEM_COLORS)[src];
    if (named || src[0] === "#")
        return new ParsedColor(
            "srgb",
            intArgb32Srgb([], parseHex(named || src))
        );
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
            return new ParsedColor("lab50", [
                parsePercent(a, false),
                parseNumber(b) * 0.01,
                parseNumber(c) * 0.01,
                parseAlpha(d),
            ]);
        case "lch":
            return new ParsedColor("lch", [
                parsePercent(a, false),
                parseNumber(b) * 0.01,
                parseHue(c),
                parseAlpha(d),
            ]);
        default:
            unsupported(`color mode: ${mode}`);
    }
};

const HUE_NORMS: Record<string, number> = {
    rad: TAU,
    grad: 400,
    turn: 1,
    deg: 360,
    undefined: 360,
};

const parseHue = (x: string) => {
    const match = /^(-?[0-9.]+)(deg|rad|grad|turn)?$/.exec(x);
    assert(!!match, `expected hue, got: ${x}`);
    return fract(parseFloat(match![1]) / HUE_NORMS[match![2]]);
};

const parseAlpha = (x?: string) => (x ? parseNumOrPercent(x, 1) : 1);

const parsePercent = (x: string, clamp = true) => {
    assert(/^([0-9.]+)%$/.test(x), `expected percentage, got: ${x}`);
    const res = parseFloat(x) / 100;
    return clamp ? clamp01(res) : res;
};

const parseNumber = (x: string) => {
    assert(/^-?[0-9.]+$/.test(x), `expected number, got: ${x}`);
    return parseFloat(x);
};

const parseNumOrPercent = (x: string, norm = 255, clamp = true) => {
    assert(/^-?[0-9.]+%?$/.test(x), `expected number or percentage, got: ${x}`);
    const res = parseFloat(x) / (x.endsWith("%") ? 100 : norm);
    return clamp ? clamp01(res) : res;
};

export const parseHex = (src: string): number => {
    const match = /^#?([0-9a-f]{3,8})$/i.exec(src);
    if (match) {
        const hex = match[1];
        switch (hex.length) {
            case 3:
                return (
                    (interleave4_12_24(parseInt(hex, 16)) | 0xff000000) >>> 0
                );
            case 4:
                return interleave4_16_32(parseInt(hex, 16)) >>> 0;
            case 6:
                return (parseInt(hex, 16) | 0xff000000) >>> 0;
            case 8:
                return parseInt(hex, 16) >>> 0;
            default:
        }
    }
    return illegalArgs(`invalid hex color: "${src}"`);
};
