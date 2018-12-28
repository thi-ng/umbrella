import { defmulti, Implementation3, MultiFn2O } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
    Color,
    ColorMode,
    IColor,
    ReadonlyColor
} from "./api";
import { hsiaRgba } from "./hsia-rgba";
import { hslaCss } from "./hsla-css";
import { hslaRgba } from "./hsla-rgba";
import { hsvaCss } from "./hsva-css";
import { hsvaRgba } from "./hsva-rgba";
import { int32Css } from "./int-css";
import { int32Rgba } from "./int-rgba";
import { parseCss } from "./parse-css";
import { rgbaCss } from "./rgba-css";
import { rgbaHsia } from "./rgba-hsia";
import { rgbaHsla } from "./rgba-hsla";
import { rgbaHsva } from "./rgba-hsva";
import { rgbaInt } from "./rgba-int";

export const convert: MultiFn2O<string | number | ReadonlyColor | IColor, ColorMode, ColorMode, Color | string | number> =
    defmulti(
        (col, mdest, msrc) =>
            (<any>col).mode !== undefined ?
                `${ColorMode[mdest]}-${ColorMode[<ColorMode>(<any>col).mode]}` :
                msrc !== undefined ?
                    `${ColorMode[mdest]}-${ColorMode[msrc]}` :
                    illegalArgs(`missing src color mode`)
    );

export function asRGBA(col: IColor): Color;
export function asRGBA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asRGBA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.RGBA, mode);
}

export function asHCYA(col: IColor): Color;
export function asHCYA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asHCYA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HCYA, mode);
}

export function asHSIA(col: IColor): Color;
export function asHSIA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asHSIA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSIA, mode);
}

export function asHSLA(col: IColor): Color;
export function asHSLA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asHSLA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSLA, mode);
}

export function asHSVA(col: IColor): Color;
export function asHSVA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asHSVA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSVA, mode);
}

export function asCSS(col: IColor): string;
export function asCSS(col: string | number | ReadonlyColor, mode: ColorMode): string;
export function asCSS(col: any, mode?: ColorMode) {
    return <string>convert(col, ColorMode.CSS, mode);
}

const defConversion = (
    dest: ColorMode,
    src: ColorMode,
    impl: Implementation3<string | number | ReadonlyColor, ColorMode, ColorMode, Color | string | number>
) =>
    convert.add(
        `${ColorMode[dest]}-${ColorMode[src]}`,
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
    ColorMode.INT32, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.INT32)
);

defConversion(
    ColorMode.RGBA, ColorMode.CSS,
    (x: string) => <Color>parseCss(x, ColorMode.RGBA)
);

// Int

defConversion(
    ColorMode.CSS, ColorMode.INT32,
    (x: number) => int32Css(x)
);

defConversion(
    ColorMode.HSLA, ColorMode.INT32,
    (x: number) => rgbaHsla(null, int32Rgba([], x))
);

defConversion(
    ColorMode.HSVA, ColorMode.INT32,
    (x: number) => rgbaHsva(null, int32Rgba([], x))
);

defConversion(
    ColorMode.RGBA, ColorMode.INT32,
    (x: number) => int32Rgba([], x)
);

// HSIA

defConversion(
    ColorMode.CSS, ColorMode.HSIA,
    (x: ReadonlyColor) => rgbaCss(hsiaRgba([], x))
);

defConversion(
    ColorMode.HSLA, ColorMode.HSIA,
    (x: ReadonlyColor) => rgbaHsla(null, hsiaRgba([], x))
);

defConversion(
    ColorMode.HSVA, ColorMode.HSIA,
    (x: ReadonlyColor) => rgbaHsva(null, hsiaRgba([], x))
);

defConversion(
    ColorMode.RGBA, ColorMode.HSIA,
    (x: ReadonlyColor) => hsiaRgba([], x)
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
    ColorMode.HSIA, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaHsia([], x)
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
    ColorMode.INT32, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaInt(x)
);
