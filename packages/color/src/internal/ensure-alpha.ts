import { clamp01 } from "@thi.ng/math";

export const ensureAlpha = (x: number, def = 1) =>
    x != undefined ? clamp01(x) : def;
