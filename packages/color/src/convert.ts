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

const RGBA_FNS = {
    [ColorMode.CSS]: rgbaCss,
    [ColorMode.INT32]: rgbaInt,
    [ColorMode.HCYA]: rgbaHcya,
    [ColorMode.HSIA]: rgbaHsia,
    [ColorMode.HSLA]: rgbaHsla,
    [ColorMode.HSVA]: rgbaHsva,
    [ColorMode.XYZA]: rgbaXyza,
    [ColorMode.YCBCRA]: rgbaYcbcra,
};

export const convert: MultiFn2O<string | number | ReadonlyColor | IColor, ColorMode, ColorMode, Color | string | number> =
    defmulti(
        (col, mdest, msrc) =>
            (<any>col).mode !== undefined ?
                `${ColorMode[mdest]}-${ColorMode[<ColorMode>(<any>col).mode]}` :
                msrc !== undefined ?
                    `${ColorMode[mdest]}-${ColorMode[msrc]}` :
                    illegalArgs(`missing src color mode`)
    );

export function asCss(col: IColor): string;
export function asCss(col: string | number | ReadonlyColor, mode: ColorMode): string;
export function asCss(col: any, mode?: ColorMode) {
    return <string>convert(col, ColorMode.CSS, mode);
}

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

export function asXYZA(col: IColor): Color;
export function asXYZA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asXYZA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.XYZA, mode);
}

export function asYCbCrA(col: IColor): Color;
export function asYCbCrA(col: string | number | ReadonlyColor, mode: ColorMode): Color;
export function asYCbCrA(col: any, mode?: ColorMode) {
    return <Color>convert(col, ColorMode.YCBCRA, mode);
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

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.INT32,
    ColorMode.RGBA,
    ColorMode.XYZA,
    ColorMode.YCBCRA
].forEach(
    (id) => defConversion(
        id, ColorMode.CSS,
        (x: string) => <Color>parseCss(x, id)
    )
);

// Int

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.INT32,
        (x: number) => RGBA_FNS[id](null, int32Rgba([], x))
    )
);

defConversion(
    ColorMode.CSS, ColorMode.INT32,
    (x: number) => int32Css(x)
);

defConversion(
    ColorMode.RGBA, ColorMode.INT32,
    (x: number) => int32Rgba([], x)
);

// HSIA

[
    ColorMode.CSS,
    ColorMode.INT32,
    ColorMode.HCYA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.HSIA,
        (x: ReadonlyColor) => RGBA_FNS[id](null, hsiaRgba([], x))
    )
);

defConversion(
    ColorMode.RGBA, ColorMode.HSIA,
    (x: ReadonlyColor) => hsiaRgba([], x)
);

// HSLA

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.INT32,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.HSLA,
        (x: ReadonlyColor) => RGBA_FNS[id](null, hslaRgba([], x))
    )
);

defConversion(
    ColorMode.CSS, ColorMode.HSLA,
    (x: ReadonlyColor) => hslaCss(x)
);

defConversion(
    ColorMode.HSVA, ColorMode.HSLA,
    (x: ReadonlyColor) => hslaHsva([], x)
);

defConversion(
    ColorMode.RGBA, ColorMode.HSLA,
    (x: ReadonlyColor) => hslaRgba([], x)
);

// HSVA

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.INT32,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.HSVA,
        (x: ReadonlyColor) => RGBA_FNS[id](null, hsvaRgba([], x))
    )
);

defConversion(
    ColorMode.CSS, ColorMode.HSVA,
    (x: ReadonlyColor) => hsvaCss(x)
);

defConversion(
    ColorMode.HSLA, ColorMode.HSVA,
    (x: ReadonlyColor) => hsvaHsla([], x)
);

defConversion(
    ColorMode.RGBA, ColorMode.HSVA,
    (x: ReadonlyColor) => hsvaRgba([], x)
);

// RGBA

[
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.XYZA,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.RGBA,
        (x: ReadonlyColor) => RGBA_FNS[id]([], x)
    )
);

defConversion(
    ColorMode.CSS, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaCss(x)
);

defConversion(
    ColorMode.INT32, ColorMode.RGBA,
    (x: ReadonlyColor) => rgbaInt(x)
);

// XYZA

[
    ColorMode.CSS,
    ColorMode.HCYA,
    ColorMode.HSIA,
    ColorMode.HSLA,
    ColorMode.HSVA,
    ColorMode.INT32,
    ColorMode.YCBCRA,
].forEach(
    (id) => defConversion(
        id, ColorMode.RGBA,
        (x: ReadonlyColor) => RGBA_FNS[id](xyzaRgba([], x))
    )
);

defConversion(
    ColorMode.RGBA, ColorMode.XYZA,
    (x: ReadonlyColor) => xyzaRgba([], x)
);
