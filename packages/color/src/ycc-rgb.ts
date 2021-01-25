import { clamp01 } from "@thi.ng/math";
import { setC4 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";

export const yccRgb: ColorOp = (out, src) => {
    const y = src[0];
    const b = src[1];
    const r = src[2];
    return setC4(
        out || [],
        clamp01(y + 1.403 * r),
        clamp01(y - 0.344 * b - 0.714 * r),
        clamp01(y + 1.77 * b),
        ensureAlpha(src[3])
    );
};
