import type { Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import type {
    Color,
    ColorConversion,
    ColorMode,
    ColorTargetConversion,
    IColor,
    ReadonlyColor,
} from "./api";
import { HCY, hcy } from "./hcy";
import { hcyRgb } from "./hcy-rgb";
import { HSI, hsi } from "./hsi";
import { hsiRgb } from "./hsi-rgb";
import { HSL, hsl } from "./hsl";
import { hslCss } from "./hsl-css";
import { hslHsv } from "./hsl-hsv";
import { hslRgb } from "./hsl-rgb";
import { HSV, hsv } from "./hsv";
import { hsvCss } from "./hsv-css";
import { hsvHsl } from "./hsv-hsl";
import { hsvRgb } from "./hsv-rgb";
import { int32Css } from "./int-css";
import { int32Rgb } from "./int-rgba";
import { int32Srgb } from "./int-srgb";
import { Lab, lab } from "./lab";
import { labCss } from "./lab-css";
import { labLch, lchLab } from "./lab-lch";
import { LCH, lch } from "./lch";
import { lchCss } from "./lch-css";
import { Oklab, oklab } from "./oklab";
import { oklabRgb } from "./oklab-rgb";
import { parseCss } from "./parse-css";
import { RGB, rgb } from "./rgb";
import { rgbCss } from "./rgb-css";
import { rgbHcy } from "./rgb-hcy";
import { rgbHsi } from "./rgb-hsi";
import { rgbHsl } from "./rgb-hsl";
import { rgbHsv } from "./rgb-hsv";
import { rgbOklab } from "./rgb-oklab";
import { rgbSrgb } from "./rgb-srgb";
import { rgbXyz } from "./rgb-xyz";
import { rgbYcc } from "./rgb-ycc";
import { SRGB, srgb } from "./srgb";
import { srgbCss } from "./srgb-css";
import { srgbInt } from "./srgb-int";
import { srgbRgb } from "./srgb-rgb";
import { xyy, XYY } from "./xyy";
import { xyyXyz } from "./xyy-xyz";
import { XYZ, xyz } from "./xyz";
import { xyzRgb } from "./xyz-rgb";
import { xyzXyy } from "./xyz-xyy";
import { YCC, ycc } from "./ycc";
import { yccRgb } from "./ycc-rgb";

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

export const asCss: ColorTargetConversion<string> = (
    col: any,
    mode?: ColorMode
) => <string>convert(col, "css", mode);

export const asHcy: ColorTargetConversion<HCY> = (col: any, mode?: ColorMode) =>
    hcy(<Color>convert(col, "hcy", mode));

export const asHsi: ColorTargetConversion<HSI> = (col: any, mode?: ColorMode) =>
    hsi(<Color>convert(col, "hsi", mode));

export const asHsl: ColorTargetConversion<HSL> = (col: any, mode?: ColorMode) =>
    hsl(<Color>convert(col, "hsl", mode));

export const asHsv: ColorTargetConversion<HSV> = (col: any, mode?: ColorMode) =>
    hsv(<Color>convert(col, "hsv", mode));

export const asLab: ColorTargetConversion<Lab> = (col: any, mode?: ColorMode) =>
    lab(<Color>convert(col, "lab", mode));

export const asLch: ColorTargetConversion<LCH> = (col: any, mode?: ColorMode) =>
    lch(<Color>convert(col, "lch", mode));

export const asOklab: ColorTargetConversion<Oklab> = (
    col: any,
    mode?: ColorMode
) => oklab(<Color>convert(col, "oklab", mode));

export const asRgb: ColorTargetConversion<RGB> = (col: any, mode?: ColorMode) =>
    rgb(<Color>convert(col, "rgb", mode));

export const asSrgb: ColorTargetConversion<SRGB> = (
    col: any,
    mode?: ColorMode
) => srgb(<Color>convert(col, "srgb", mode));

export const asXyy: ColorTargetConversion<XYY> = (col: any, mode?: ColorMode) =>
    xyy(<Color>convert(col, "xyy", mode));

export const asXyz: ColorTargetConversion<XYZ> = (col: any, mode?: ColorMode) =>
    xyz(<Color>convert(col, "xyz", mode));

export const asYcc: ColorTargetConversion<YCC> = (col: any, mode?: ColorMode) =>
    ycc(<Color>convert(col, "ycc", mode));

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
    int32Rgb,
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "oklab",
    "xyz",
    "ycc"
);

defConversion("srgb", "int", (x: any) => int32Srgb([], x));

defConversion("css", "int", (x: any) => int32Css(x));

// HCYA

defConversions(
    "hcy",
    hcyRgb,
    "css",
    "int",
    "hsl",
    "hsv",
    "oklab",
    "srgb",
    "xyz",
    "ycc"
);

// HSIA

defConversions(
    "hsi",
    hsiRgb,
    "css",
    "int",
    "hcy",
    "hsl",
    "hsv",
    "oklab",
    "srgb",
    "xyz",
    "ycc"
);

// HSLA

defConversions(
    "hsl",
    hslRgb,
    "hcy",
    "hsi",
    "int",
    "oklab",
    "srgb",
    "xyz",
    "ycc"
);

defConversion("css", "hsl", (x: any) => hslCss(x));

defConversion("hsv", "hsl", (x: any) => hslHsv([], x));

// HSVA

defConversions(
    "hsv",
    hsvRgb,
    "hcy",
    "hsi",
    "int",
    "oklab",
    "srgb",
    "xyz",
    "ycc"
);

defConversion("css", "hsv", (x: any) => hsvCss(x));

defConversion("hsl", "hsv", (x: any) => hsvHsl([], x));

// LAB

defConversion("css", "lab", (x: any) => labCss(x));
defConversion("lch", "lab", (x: any) => labLch([], x));

// LCH

defConversion("css", "lch", (x: any) => lchCss(x));
defConversion("lab", "lch", (x: any) => lchLab([], x));

// Oklab

defConversions(
    "oklab",
    oklabRgb,
    "css",
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "srgb",
    "xyz",
    "ycc"
);

// RGBA

(<[ColorMode, ColorConversion<ReadonlyColor>][]>[
    ["hcy", rgbHcy],
    ["hsi", rgbHsi],
    ["hsl", rgbHsl],
    ["hsv", rgbHsv],
    ["oklab", rgbOklab],
    ["srgb", rgbSrgb],
    ["xyz", rgbXyz],
    ["ycbcr", rgbYcc],
]).forEach(([id, fn]) => defConversion(id, "rgb", (x: any) => fn([], x)));

defConversion("css", "rgb", (x: any) => rgbCss(x));

// SRGBA

defConversion("css", "srgb", (x: any) => srgbCss(x));

defConversion("int", "srgb", (x: any) => srgbInt(x));

defConversions(
    "srgb",
    srgbRgb,
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "oklab",
    "xyz",
    "ycc"
);

// XYY

defConversion("xyy", "xyz", (x: any) => xyzXyy([], x));

// XYZA

defConversions(
    "xyz",
    xyzRgb,
    "css",
    "hcy",
    "hsi",
    "hsl",
    "hsv",
    "int",
    "oklab",
    "srgb",
    "ycc"
);

defConversion("xyz", "xyy", (x: any) => xyyXyz([], x));

// YCbCr

defConversions(
    "ycc",
    yccRgb,
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
