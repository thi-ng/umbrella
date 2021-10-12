import { clamp01 } from "@thi.ng/math/interval";
import type { ReadonlyColor } from "../api";
import { __ensureAlpha } from "../internal/ensure";

export const srgbIntArgb32 = (src: ReadonlyColor) =>
    (((__ensureAlpha(src[3]) * 0xff + 0.5) << 24) |
        ((clamp01(src[0]) * 0xff + 0.5) << 16) |
        ((clamp01(src[1]) * 0xff + 0.5) << 8) |
        (clamp01(src[2]) * 0xff + 0.5)) >>>
    0;

export const srgbIntAbgr32 = (src: ReadonlyColor) =>
    (((__ensureAlpha(src[3]) * 0xff + 0.5) << 24) |
        ((clamp01(src[2]) * 0xff + 0.5) << 16) |
        ((clamp01(src[1]) * 0xff + 0.5) << 8) |
        (clamp01(src[0]) * 0xff + 0.5)) >>>
    0;
