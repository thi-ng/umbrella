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
import { HCYA, hcya } from "./hcya";
import { hcyaRgba } from "./hcya-rgba";
import { HSIA, hsia } from "./hsia";
import { hsiaRgba } from "./hsia-rgba";
import { HSLA, hsla } from "./hsla";
import { hslaCss } from "./hsla-css";
import { hslaHsva } from "./hsla-hsva";
import { hslaRgba } from "./hsla-rgba";
import { HSVA, hsva } from "./hsva";
import { hsvaCss } from "./hsva-css";
import { hsvaHsla } from "./hsva-hsla";
import { hsvaRgba } from "./hsva-rgba";
import { int32Css } from "./int-css";
import { int32Rgba } from "./int-rgba";
import { int32Srgba } from "./int-srgba";
import { LAB, lab } from "./lab";
import { labCss } from "./lab-css";
import { LCH, lch } from "./lch";
import { lchCss } from "./lch-css";
import { Oklab, oklab } from "./oklab";
import { oklabRgba } from "./oklab-rgba";
import { parseCss } from "./parse-css";
import { RGBA, rgba } from "./rgba";
import { rgbaCss } from "./rgba-css";
import { rgbaHcya } from "./rgba-hcya";
import { rgbaHsia } from "./rgba-hsia";
import { rgbaHsla } from "./rgba-hsla";
import { rgbaHsva } from "./rgba-hsva";
import { rgbaOklab } from "./rgba-oklab";
import { rgbaSrgba } from "./rgba-srgba";
import { rgbaXyza } from "./rgba-xyza";
import { rgbaYcbcra } from "./rgba-ycbcra";
import { SRGBA, srgba } from "./srgba";
import { srgbaCss } from "./srgba-css";
import { srgbaInt } from "./srgba-int";
import { srgbaRgba } from "./srgba-rgba";
import { XYZA, xyza } from "./xyza";
import { xyzaRgba } from "./xyza-rgba";
import { YCbCrA, ycbcra } from "./ycbcr";
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
        : illegalArgs(
              `missing conversion for mode ${col.mode || msrc} -> ${mdest}`
          )
);

export function asCSS(col: IColor): string;
export function asCSS(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): string;
export function asCSS(col: any, mode?: ColorMode) {
    return <string>convert(col, "css", mode);
}

export function asHCYA(col: IColor): HCYA;
export function asHCYA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): HCYA;
export function asHCYA(col: any, mode?: ColorMode) {
    return hcya(<Color>convert(col, "hcy", mode));
}

export function asHSIA(col: IColor): HSIA;
export function asHSIA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): HSIA;
export function asHSIA(col: any, mode?: ColorMode) {
    return hsia(<Color>convert(col, "hsi", mode));
}

export function asHSLA(col: IColor): HSLA;
export function asHSLA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): HSLA;
export function asHSLA(col: any, mode?: ColorMode) {
    return hsla(<Color>convert(col, "hsl", mode));
}

export function asHSVA(col: IColor): HSVA;
export function asHSVA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): HSVA;
export function asHSVA(col: any, mode?: ColorMode) {
    return hsva(<Color>convert(col, "hsv", mode));
}

export function asLAB(col: IColor): LAB;
export function asLAB(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): LAB;
export function asLAB(col: any, mode?: ColorMode) {
    return lab(<Color>convert(col, "lab", mode));
}

export function asLCH(col: IColor): LCH;
export function asLCH(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): LCH;
export function asLCH(col: any, mode?: ColorMode) {
    return lch(<Color>convert(col, "lch", mode));
}

export function asOklab(col: IColor): Oklab;
export function asOklab(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): Oklab;
export function asOklab(col: any, mode?: ColorMode) {
    return oklab(<Color>convert(col, "oklab", mode));
}

export function asRGBA(col: IColor): RGBA;
export function asRGBA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): RGBA;
export function asRGBA(col: any, mode?: ColorMode) {
    return rgba(<Color>convert(col, "rgb", mode));
}

export function asSRGBA(col: IColor): SRGBA;
export function asSRGBA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): SRGBA;
export function asSRGBA(col: any, mode?: ColorMode) {
    return srgba(<Color>convert(col, "srgb", mode));
}

export function asXYZA(col: IColor): XYZA;
export function asXYZA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): XYZA;
export function asXYZA(col: any, mode?: ColorMode) {
    return xyza(<Color>convert(col, "xyz", mode));
}

export function asYCbCrA(col: IColor): YCbCrA;
export function asYCbCrA(
    col: string | number | ReadonlyColor,
    mode: ColorMode
): YCbCrA;
export function asYCbCrA(col: any, mode?: ColorMode) {
    return ycbcra(<Color>convert(col, "ycbcr", mode));
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

// defConversion("rgb", "css", (x: any) => parseCss(x));

(<ColorMode[]>[
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "lab",
    "lch",
    "oklab",
    "rgb",
    "srgb",
    "xyz",
    "ycbcr",
]).forEach((id) =>
    defConversion(id, "css", (x: any) => convert(parseCss(x), id))
);

// Int

defConversions(
    "int",
    int32Rgba,
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "oklab",
    "xyz",
    "ycbcr"
);

defConversion("srgb", "int", (x: any) => int32Srgba([], x));

defConversion("css", "int", (x: any) => int32Css(x));

// HCYA

defConversions(
    "hcy",
    hcyaRgba,
    "css",
    "int",
    "hsl",
    "hsv",
    "oklab",
    "srgb",
    "xyz",
    "ycbcr"
);

// HSIA

defConversions(
    "hsi",
    hsiaRgba,
    "css",
    "int",
    "hcy",
    "hsl",
    "hsv",
    "oklab",
    "srgb",
    "xyz",
    "ycbcr"
);

// HSLA

defConversions(
    "hsl",
    hslaRgba,
    "hcy",
    "hsi",
    "int",
    "oklab",
    "srgb",
    "xyz",
    "ycbcr"
);

defConversion("css", "hsl", (x: any) => hslaCss(x));

defConversion("hsv", "hsl", (x: any) => hslaHsva([], x));

// HSVA

defConversions(
    "hsv",
    hsvaRgba,
    "hcy",
    "hsi",
    "int",
    "oklab",
    "srgb",
    "xyz",
    "ycbcr"
);

defConversion("css", "hsv", (x: any) => hsvaCss(x));

defConversion("hsl", "hsv", (x: any) => hsvaHsla([], x));

// LAB

defConversion("css", "lab", (x: any) => labCss(x));

// LCH

defConversion("css", "lch", (x: any) => lchCss(x));

// Oklab

defConversions(
    "oklab",
    oklabRgba,
    "css",
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "srgb",
    "xyz",
    "ycbcr"
);

// RGBA

(<[ColorMode, ColorConversion<ReadonlyColor>][]>[
    ["hcy", rgbaHcya],
    ["hsi", rgbaHsia],
    ["hsl", rgbaHsla],
    ["hsv", rgbaHsva],
    ["oklab", rgbaOklab],
    ["srgb", rgbaSrgba],
    ["xyz", rgbaXyza],
    ["ycbcr", rgbaYcbcra],
]).forEach(([id, fn]) => defConversion(id, "rgb", (x: any) => fn([], x)));

defConversion("css", "rgb", (x: any) => rgbaCss(x));

// SRGBA

defConversion("css", "srgb", (x: any) => srgbaCss(x));

defConversion("int", "srgb", (x: any) => srgbaInt(x));

defConversions(
    "srgb",
    srgbaRgba,
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "oklab",
    "xyz",
    "ycbcr"
);

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
    "oklab",
    "srgb",
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
    "oklab",
    "srgb",
    "xyz"
);
