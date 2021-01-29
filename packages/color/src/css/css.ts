import type { Fn } from "@thi.ng/api";
import { isNumber, isString } from "@thi.ng/checks";
import type { ColorMode, TypedColor, ReadonlyColor } from "../api";
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

export const css = (src: TypedColor<any> | ReadonlyColor | string | number) => {
    if (isString(src)) return src;
    if (isNumber(src)) return int32Css(src);
    if ((<TypedColor<any>>src).mode) {
        const asCss = CSS_CONVERSIONS[(<TypedColor<any>>src).mode];
        if (asCss) return asCss(src);
        return CSS_CONVERSIONS.rgb!(
            convert([], src, "rgb", (<TypedColor<any>>src).mode)
        );
    }
    return srgbCss(src);
};
