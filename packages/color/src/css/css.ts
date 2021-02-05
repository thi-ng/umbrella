import type { Fn } from "@thi.ng/api";
import { isNumber, isString } from "@thi.ng/checks";
import type { ColorMode, IParsedColor, MaybeColor, TypedColor } from "../api";
import { convert } from "../convert";
import { hslCss } from "../hsl/hsl-css";
import { hsvCss } from "../hsv/hsv-css";
import { intArgb32Css } from "../int/int-css";
import { intAbgr32Argb32 } from "../int/int-int";
import { lchLab } from "../lab/lab-lch";
import { labRgb, labRgbD65 } from "../lab/lab-rgb";
import { rgbCss } from "../rgb/rgb-css";
import { rgbSrgb } from "../rgb/rgb-srgb";
import { srgbCss } from "../srgb/srgb-css";

/** @internal */
const CSS_CONVERSIONS: Partial<Record<ColorMode, Fn<any, string>>> = {
    abgr32: (x) => intArgb32Css(intAbgr32Argb32(x[0])),
    argb32: (x) => intArgb32Css(x[0]),
    hsl: hslCss,
    hsv: hsvCss,
    // TODO temporarily disabled until CSS L4 is officially supported in browsers
    // currently serializing as sRGB CSS
    // lab50: labCss,
    // lab65: (x) => labCss(labLabD65_50([], x)),
    // lch: lchCss,
    lab50: (src) => srgbCss(rgbSrgb(null, labRgb([], src))),
    lab65: (src) => srgbCss(rgbSrgb(null, labRgbD65([], src))),
    lch: (src) => srgbCss(rgbSrgb(null, labRgb(null, lchLab([], src)))),
    rgb: rgbCss,
    srgb: srgbCss,
};

/**
 * Takes a color in one of the following formats and tries to convert it
 * to a CSS string:
 *
 * - any {@link TypedColor} instance
 * - raw sRGB(A) vector
 * - number (packed 0xaarrggbb int, MUST provide alpha channel)
 * - string (passthrough)
 *
 * @param col - source color
 */
export const css = (src: Exclude<MaybeColor, IParsedColor>) => {
    let asCss: Fn<any, string> | undefined;
    return isString(src)
        ? src
        : isNumber(src)
        ? intArgb32Css(src)
        : (<TypedColor<any>>src).mode
        ? (asCss = CSS_CONVERSIONS[(<TypedColor<any>>src).mode])
            ? asCss(src)
            : CSS_CONVERSIONS.rgb!(
                  convert([], src, "rgb", (<TypedColor<any>>src).mode)
              )
        : srgbCss(src);
};
