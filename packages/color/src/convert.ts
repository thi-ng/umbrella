import type { Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import type {
    Color,
    ColorConversion,
    ColorMode,
    IColor,
    ReadonlyColor,
} from "./api";
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
    return <string>convert(col, "css", mode);
}

export function asRGBA(col: IColor): Color;
export function asRGBA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asRGBA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "rgb", mode);
}

export function asHCYA(col: IColor): Color;
export function asHCYA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHCYA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "hcy", mode);
}

export function asHSIA(col: IColor): Color;
export function asHSIA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSIA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "hsi", mode);
}

export function asHSLA(col: IColor): Color;
export function asHSLA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSLA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "hsl", mode);
}

export function asHSVA(col: IColor): Color;
export function asHSVA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asHSVA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "hsv", mode);
}

export function asXYZA(col: IColor): Color;
export function asXYZA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asXYZA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "xyz", mode);
}

export function asYCbCrA(col: IColor): Color;
export function asYCbCrA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Color;
export function asYCbCrA(col: any, mode?: ColorMode) {
    return <Color>convert(col, "ycbcr", mode);
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
    defConversion("rgb", src, (x: any) => toRGBA([], x));
    dest.forEach((id) =>
        defConversion(id, src, (x: any) => convert(toRGBA([], x), id, "rgb"))
    );
};

// CSS

defConversion("rgb", "css", (x: any) => parseCss(x));

(<ColorMode[]>[
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "xyz",
    "ycbcr",
]).forEach((id) =>
    defConversion(id, "css", (x: any) => convert(parseCss(x), id, "rgb"))
);

// Int

defConversions("int", int32Rgba, "hcy", "hsi", "hsl", "hsv", "xyz", "ycbcr");

defConversion("css", "int", (x: any) => int32Css(x));

// HCYA

defConversions("hcy", hcyaRgba, "css", "int", "hsl", "hsv", "xyz", "ycbcr");

// HSIA

defConversions(
    "hsi",
    hsiaRgba,
    "css",
    "int",
    "hcy",
    "hsl",
    "hsv",
    "xyz",
    "ycbcr"
);

// HSLA

defConversions("hsl", hslaRgba, "hcy", "hsi", "int", "xyz", "ycbcr");

defConversion("css", "hsl", (x: any) => hslaCss(x));

defConversion("hsv", "hsl", (x: any) => hslaHsva([], x));

// HSVA

defConversions("hsv", hsvaRgba, "hcy", "hsi", "int", "xyz", "ycbcr");

defConversion("css", "hsv", (x: any) => hsvaCss(x));

defConversion("hsl", "hsv", (x: any) => hsvaHsla([], x));

// RGBA

(<[ColorMode, ColorConversion<ReadonlyColor>][]>[
    ["hcy", rgbaHcya],
    ["hsi", rgbaHsia],
    ["hsl", rgbaHsla],
    ["hsv", rgbaHsva],
    ["xyz", rgbaXyza],
    ["ycbcr", rgbaYcbcra],
]).forEach(([id, fn]) => defConversion(id, "rgb", (x: any) => fn([], x)));

defConversion("css", "rgb", (x: any) => rgbaCss(x));

defConversion("int", "rgb", (x: any) => rgbaInt(x));

// XYZA

defConversions(
    "xyz",
    xyzaRgba,
    "css",
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "ycbcr"
);

// YCbCr

defConversions(
    "ycbcr",
    ycbcraRgba,
    "css",
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "xyz"
);
