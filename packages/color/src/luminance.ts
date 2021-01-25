import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import type { ColorMode, IColor, ReadonlyColor } from "./api";
import { convert } from "./convert";
import { luminanceInt, luminanceRgb } from "./luminance-rgb";

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

luminance.add("rgb", (x: any) => luminanceRgb(x));

luminance.add("int", (x: any) =>
    luminanceInt(typeof x === "number" ? x : x.deref())
);

luminance.add(DEFAULT, (x: any, mode) =>
    luminanceRgb(<ReadonlyColor>convert(x, "rgb", mode))
);
