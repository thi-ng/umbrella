import { setC4 } from "@thi.ng/vectors3/setc";
import { Color, INV8BIT } from "./api";
import { IDeref } from "@thi.ng/api/api";

export const intRgba =
    (out: Color, src: number | IDeref<number>) => {
        src = typeof src === "number" ? src : src.deref();
        return setC4(
            out || [],
            (src >>> 16 & 0xff) * INV8BIT,
            (src >>> 8 & 0xff) * INV8BIT,
            (src & 0xff) * INV8BIT,
            (src >>> 24 & 0xff) * INV8BIT
        );
    };
