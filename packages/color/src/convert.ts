import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import { ColorMode } from "./constants";
import { hcyaRgba } from "./hcya-rgba";
import { hsiaRgba } from "./hsia-rgba";
import { hslaCss } from "./hsla-css";
import { hslaHsva } from "./hsla-hsva";
import { hslaRgba } from "./hsla-rgba";
import { hsvaCss } from "./hsva-css";
import { hsvaHsla } from "./hsva-hsla";
import { hsvaRgba } from "./hsva-rgba";
import { int32Css } from "./int-css";
import { int32Rgba } from "./int-rgba";
import { parseCss } from "./parse-css";
import { rgbaCss } from "./rgba-css";
import { rgbaHcya } from "./rgba-hcya";
import { rgbaHsia } from "./rgba-hsia";
import { rgbaHsla } from "./rgba-hsla";
import { rgbaHsva } from "./rgba-hsva";
import { rgbaInt } from "./rgba-int";
import { rgbaXyza } from "./rgba-xyza";
import { rgbaYcbcra } from "./rgba-ycbcra";
import { xyzaRgba } from "./xyza-rgba";
import { ycbcraRgba } from "./ycbcra-rgba";
import type { Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import type { Color, ColorConversion, IColor, ReadonlyColor } from "./api";

export const convert: MultiFn2O<
    string | number | ReadonlyColor | IColor,
    ColorMode,
    ColorMode,
    Color | string | number
> = defmulti((col: any, mdest, msrc) =>
    col.mode !== undefined
        ? `${mdest}-${col.mode}`
        : msrc !== undefined
        ? `${mdest}-${msrc}`
        : illegalArgs(`missing src color mode`)
);
convert.add(DEFAULT, (col: any, mdest, msrc) =>
    (col.mode !== undefined && col.mode === mdest) || mdest === msrc
        ? col
        : illegalArgs(`missing conversion for mode ${msrc} -> ${mdest}`)
);

export function asCSS(col: IColor): string;
export function asCSS(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): string;
export function asCSS(col: any, mode?: ColorMode) {
    return <string>convert(col, ColorMode.CSS, mode);
}

export function asRGBA(col: IColor): Color;
export function asRGBA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asRGBA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.RGBA, mode);
}

export function asHCYA(col: IColor): Color;
export function asHCYA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHCYA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HCYA, mode);
}

export function asHSIA(col: IColor): Color;
export function asHSIA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSIA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSIA, mode);
}

export function asHSLA(col: IColor): Color;
export function asHSLA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSLA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSLA, mode);
}

export function asHSVA(col: IColor): Color;
export function asHSVA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSVA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.HSVA, mode);
}

export function asXYZA(col: IColor): Color;
export function asXYZA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asXYZA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.XYZA, mode);
}

export function asYCbCrA(col: IColor): Color;
export function asYCbCrA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asYCbCrA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.YCBCRA, mode);
}

const defConversion = (
    dest: ColorMode,
    src: ColorMode,
    impl: Implementation2O<
        string | number | ReadonlyColor | IColor,
        ColorMode,
        ColorMode,
        Color | string | number
    >
) => convert.add(`${dest}-${src}`, impl);

const defConversions = (
    src: ColorMode,
    toRGBA: ColorConversion<any>,
    ...dest: ColorMode[]
) => {
    defConversion(ColorMode.RGBA, src, (x: any) => toRGBA([], x));
    dest.forEach((id) =>
        defConversion(id, src, (x: any) =>
            convert(toRGBA([], x), id, ColorMode.RGBA)
        )
    );
};

// CSS

defConversion(ColorMode.RGBA, ColorMode.CSS, (x: any) => parseCss(x));

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.INT32,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach((id) =>
    defConversion(id, ColorMode.CSS, (x: any) =>
        convert(parseCss(x), id, ColorMode.RGBA)
    )
);

// Int

defConversions(
    ColorMode.INT32,
    int32Rgba,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA
);

defConversion(ColorMode.CSS, ColorMode.INT32, (x: any) => int32Css(x));

// HCYA

defConversions(
    ColorMode.HCYA,
    hcyaRgba,
    ColorMode.CSS,
    ColorMode.INT32,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA
);

// HSIA

defConversions(
    ColorMode.HSIA,
    hsiaRgba,
    ColorMode.CSS,
    ColorMode.INT32,
    ColorMode.HCYA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA
);

// HSLA

defConversions(
    ColorMode.HSLA,
    hslaRgba,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.INT32,
    ColorMode.XYZA,
    ColorMode.YCBCRA
);

defConversion(ColorMode.CSS, ColorMode.HSLA, (x: any) => hslaCss(x));

defConversion(ColorMode.HSVA, ColorMode.HSLA, (x: any) => hslaHsva([], x));

// HSVA

defConversions(
    ColorMode.HSVA,
    hsvaRgba,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.INT32,
    ColorMode.XYZA,
    ColorMode.YCBCRA
);

defConversion(ColorMode.CSS, ColorMode.HSVA, (x: any) => hsvaCss(x));

defConversion(ColorMode.HSLA, ColorMode.HSVA, (x: any) => hsvaHsla([], x));

// RGBA

(<[ColorMode, ColorConversion<ReadonlyColor>][]>[
    [ColorMode.HCYA, rgbaHcya],
    [ColorMode.HSIA, rgbaHsia],
    [ColorMode.HSLA, rgbaHsla],
    [ColorMode.HSVA, rgbaHsva],
    [ColorMode.XYZA, rgbaXyza],
    [ColorMode.YCBCRA, rgbaYcbcra],
]).forEach(([id, fn]) =>
    defConversion(id, ColorMode.RGBA, (x: any) => fn([], x))
);

defConversion(ColorMode.CSS, ColorMode.RGBA, (x: any) => rgbaCss(x));

defConversion(ColorMode.INT32, ColorMode.RGBA, (x: any) => rgbaInt(x));

// XYZA

defConversions(
    ColorMode.XYZA,
    xyzaRgba,
    ColorMode.CSS,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.INT32,
    ColorMode.YCBCRA
);

// YCbCr

defConversions(
    ColorMode.YCBCRA,
    ycbcraRgba,
    ColorMode.CSS,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.INT32,
    ColorMode.XYZA
);
