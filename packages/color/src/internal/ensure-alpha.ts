import { clamp01 } from "@thi.ng/math/interval";

export const ensureAlpha = (x: number, def = 1) =>
    x != undefined ? clamp01(x) : def;
