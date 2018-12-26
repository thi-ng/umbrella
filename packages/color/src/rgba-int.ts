import { clamp01 } from "@thi.ng/math/interval";
import { ReadonlyColor } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";

export const rgbaInt =
    (rgba: ReadonlyColor) =>
        (
            ((ensureAlpha(rgba[3]) * 0xff) << 24) |
            ((clamp01(rgba[0]) * 0xff) << 16) |
            ((clamp01(rgba[1]) * 0xff) << 8) |
            (clamp01(rgba[2]) * 0xff)
        ) >>> 0;
