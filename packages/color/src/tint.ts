import type { MultiFn3O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { mix } from "@thi.ng/math/mix";
import { setC4 } from "@thi.ng/vectors";
import type { Color, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

export const tint: MultiFn3O<
    Color | null,
    TypedColor<any>,
    number,
    number,
    Color
> = defmulti<Color | null, TypedColor<any>, number, number | undefined, Color>(
    __dispatch1,
    { hcy: "hsv", hsi: "hsv", hsl: "hsv" },
    {
        hsv: (out, src, n, l = 1) =>
            setC4(
                out || src,
                src[0],
                src[1] * (1 - n),
                mix(src[2], l, n),
                __ensureAlpha(src[3])
            ),
        lch: (out, src, n, l = 1) =>
            setC4(
                out || src,
                mix(src[0], l, n),
                src[1] * (1 - n),
                src[2],
                __ensureAlpha(src[3])
            ),
    }
);

export const tone = (out: Color | null, src: TypedColor<any>, n: number) =>
    tint(out, src, n, 0.5);

export const shade = (out: Color | null, src: TypedColor<any>, n: number) =>
    tint(out, src, n, 0);
