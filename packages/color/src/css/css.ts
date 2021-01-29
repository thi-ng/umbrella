import type { Fn } from "@thi.ng/api";
import { isNumber, isString } from "@thi.ng/checks";
import type { ColorMode, IParsedColor, MaybeColor, TypedColor } from "../api";
import { convert } from "../convert";
import { hslCss } from "../hsl/hsl-css";
import { hsvCss } from "../hsv/hsv-css";
import { int32Css } from "../int/int-css";
import { labCss } from "../lab/lab-css";
import { lchCss } from "../lch/lch-css";
import { rgbCss } from "../rgb/rgb-css";
import { srgbCss } from "../srgb/srgb-css";

const CSS_CONVERSIONS: Partial<Record<ColorMode, Fn<any, string>>> = {
    hsl: hslCss,
    hsv: hsvCss,
    lab: labCss,
    lch: lchCss,
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
        ? int32Css(src)
        : (<TypedColor<any>>src).mode
        ? (asCss = CSS_CONVERSIONS[(<TypedColor<any>>src).mode])
            ? asCss(src)
            : CSS_CONVERSIONS.rgb!(
                  convert([], src, "rgb", (<TypedColor<any>>src).mode)
              )
        : srgbCss(src);
};
