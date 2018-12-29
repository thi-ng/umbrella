import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { dot3 } from "@thi.ng/vectors3/dot";
import {
    ColorMode,
    IColor,
    INV8BIT,
    ReadonlyColor,
    RGB_LUMINANCE
} from "./api";
import { convert } from "./convert";

export const luminanceRGB =
    (rgb: ReadonlyColor, weights = RGB_LUMINANCE) =>
        dot3(rgb, weights);

export const luminanceInt =
    (rgb: number) => (
        ((rgb >>> 16) & 0xff) * 76 +
        ((rgb >>> 8) & 0xff) * 150 +
        (rgb & 0xff) * 29
    ) * INV8BIT * INV8BIT;

/**
 * Multi-method to compute relative luminance from any supported input
 * color format. Unless color already is an RGBA or ARGB int (plain or
 * wrapped), it will first be converted to RGBA.
 */
export const luminance: MultiFn1O<number | string | ReadonlyColor | IColor, ColorMode, number> =
    defmulti(
        (col: any, mode) =>
            col.mode !== undefined ?
                col.mode :
                mode !== undefined ?
                    mode :
                    illegalArgs(`missing color mode`)
    );

luminance.add(
    ColorMode.RGBA,
    (x: ReadonlyColor) => luminanceRGB(x)
);

luminance.add(
    ColorMode.INT32,
    (x: any) => luminanceInt(typeof x === "number" ? x : x.deref())
);

luminance.add(
    DEFAULT,
    (x: any, mode) => luminanceRGB(<ReadonlyColor>convert(x, ColorMode.RGBA, mode))
);
