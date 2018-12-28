import { ONE3 } from "@thi.ng/vectors3/api";
import { sub3 } from "@thi.ng/vectors3/sub";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";

export const invertRGB =
    (out: Color, src: ReadonlyColor) => (
        out = clamp(out || src, src),
        sub3(out, ONE3, out)
    );

export const invertInt =
    (src: number) => src ^ 0xffffff;
