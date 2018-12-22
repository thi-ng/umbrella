import { clamp01 } from "@thi.ng/math/interval";
import { setC4 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { ensureAlpha } from "./ensure-alpha";

export const clamp =
    (out: Color, src: ReadonlyColor, alpha = 1) =>
        setC4(
            out || src,
            clamp01(src[0]),
            clamp01(src[1]),
            clamp01(src[2]),
            ensureAlpha(src[3], alpha)
        );
