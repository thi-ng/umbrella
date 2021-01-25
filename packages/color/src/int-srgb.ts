import type { IDeref } from "@thi.ng/api";
import { setC4 } from "@thi.ng/vectors";
import type { Color } from "./api";
import { INV8BIT } from "./constants";

export const int32Srgb = (out: Color | null, src: number | IDeref<number>) => {
    src = typeof src === "number" ? src : src.deref();
    return setC4(
        out || [],
        ((src >>> 16) & 0xff) * INV8BIT,
        ((src >>> 8) & 0xff) * INV8BIT,
        (src & 0xff) * INV8BIT,
        ((src >>> 24) & 0xff) * INV8BIT
    );
};

export const int24Srgb = (out: Color | null, src: number | IDeref<number>) => {
    src = typeof src === "number" ? src : src.deref();
    return int32Srgb(out, src | 0xff000000);
};
