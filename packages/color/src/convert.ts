import { defmulti, Implementation3, MultiFn3 } from "@thi.ng/defmulti";
import { Color, ColorMode, ReadonlyColor } from "./api";
import { hslaCss } from "./hsla-css";
import { hslaRgba } from "./hsla-rgba";
import { hsvaCss } from "./hsva-css";
import { hsvaRgba } from "./hsva-rgba";
import { intCss } from "./int-css";
import { intRgba } from "./int-rgba";
import { parseCss } from "./parse-css";
import { rgbaCss } from "./rgba-css";
import { rgbaHsla } from "./rgba-hsla";
import { rgbaHsva } from "./rgba-hsva";
import { rgbaInt } from "./rgba-int";

export const convert: MultiFn3<string | number | ReadonlyColor, ColorMode, ColorMode, Color | string | number> =
    defmulti((...args: any[]) => convID(args[1], args[2]));

export const asRGBA = (col: string | number | ReadonlyColor, mode: ColorMode) =>
    <Color>convert(col, ColorMode.RGBA, mode);

export const asHSLA = (col: string | number | ReadonlyColor, mode: ColorMode) =>
    <Color>convert(col, ColorMode.HSLA, mode);

export const asHSVA = (col: string | number | ReadonlyColor, mode: ColorMode) =>
    <Color>convert(col, ColorMode.HSLA, mode);

export const asCSS = (col: string | number | ReadonlyColor, mode: ColorMode) =>
    <string>convert(col, ColorMode.CSS, mode);

const convID =
    (dest: ColorMode, src: ColorMode) =>
        `${ColorMode[dest]}-${ColorMode[src]}`;

const defConversion = (
    dest: ColorMode,
    src: ColorMode,
    impl: Implementation3<string | number | ReadonlyColor, ColorMode, ColorMode, Color | string | number>
) =>
    convert.add(
        convID(dest, src),
        impl
    );

// CSS

defConversion(
    ColorMode.HSLA, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.HSLA)
);

defConversion(
    ColorMode.HSVA, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.HSVA)
);

defConversion(
    ColorMode.INT_ARGB, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.INT_ARGB)
);

defConversion(
    ColorMode.RGBA, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.RGBA)
);

// Int

defConversion(
    ColorMode.CSS, ColorMode.INT_ARGB,
    (x: number) => intCss(x)
);

defConversion(
    ColorMode.HSLA, ColorMode.INT_ARGB,
    (x: number) => rgbaHsla(null, intRgba([], x))
);

defConversion(
    ColorMode.HSVA, ColorMode.INT_ARGB,
    (x: number) => rgbaHsva(null, intRgba([], x))
);

defConversion(
    ColorMode.RGBA, ColorMode.INT_ARGB,
    (x: number) => intRgba([], x)
);

// HSLA

defConversion(
    ColorMode.CSS, ColorMode.HSLA,
    (x: ReadonlyColor) => hslaCss(x)
);

defConversion(
    ColorMode.RGBA, ColorMode.HSLA,
    (x: ReadonlyColor) => hslaRgba([], x)
);

// HSVA

defConversion(
    ColorMode.CSS, ColorMode.HSVA,
    (x: ReadonlyColor) => hsvaCss(x)
);

defConversion(
    ColorMode.RGBA, ColorMode.HSVA,
    (x: ReadonlyColor) => hsvaRgba([], x)
);

// RGBA

defConversion(
    ColorMode.CSS, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaCss(x)
);

defConversion(
    ColorMode.HSLA, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaHsla([], x)
);

defConversion(
    ColorMode.HSVA, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaHsva([], x)
);

defConversion(
    ColorMode.INT_ARGB, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaInt(x)
);
