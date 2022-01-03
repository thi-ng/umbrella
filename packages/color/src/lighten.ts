import { defmulti } from "@thi.ng/defmulti/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { set4 } from "@thi.ng/vectors/set";
import type { Color, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";

const $ =
    (id: number) => (out: Color | null, src: TypedColor<any>, n: number) => {
        out = set4(out || src, src);
        out[id] = clamp01(out[id] + n);
        return out;
    };

/**
 * Adjust the "lightness" (luma, brightness etc.) channel of given `src` color
 * and `delta` offset. Writes result into `out` (or if null, back into `src`).
 *
 * @param out
 * @param src
 * @param delta
 */
export const lighten = defmulti<Color | null, TypedColor<any>, number, Color>(
    __dispatch1,
    { hsv: "hsl", hsi: "hsl", hcy: "hsl" },
    {
        hsl: $(2),
        lch: $(0),
    }
);
