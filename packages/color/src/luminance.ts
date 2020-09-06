import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import type { IColor, ReadonlyColor } from "./api";
import { ColorMode } from "./constants";
import { convert } from "./convert";
import { luminanceInt, luminanceRGB } from "./luminance-rgb";

/**
 * Multi-method to compute relative luminance from any supported input
 * color format. Unless color already is an RGBA or ARGB int (plain or
 * wrapped), it will first be converted to RGBA.
 */
export const luminance: MultiFn1O<
    number | string | ReadonlyColor | IColor,
    ColorMode,
    number
> = defmulti((col: any, mode) =>
    col.mode !== undefined
        ? col.mode
        : mode !== undefined
        ? mode
        : illegalArgs(`missing color mode`)
);

luminance.add(ColorMode.RGBA, (x: any) => luminanceRGB(x));

luminance.add(ColorMode.INT32, (x: any) =>
    luminanceInt(typeof x === "number" ? x : x.deref())
);

luminance.add(DEFAULT, (x: any, mode) =>
    luminanceRGB(<ReadonlyColor>convert(x, ColorMode.RGBA, mode))
);
