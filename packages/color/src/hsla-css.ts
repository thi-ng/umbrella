import { clamp01 } from "@thi.ng/math";
import { FF, PC } from "./constants";
import { ensureAlpha } from "./internal/ensure-alpha";
import { ensureHue } from "./internal/ensure-hue";
import type { ReadonlyColor } from "./api";

export const hslaCss = (src: ReadonlyColor) => {
    const h = FF(ensureHue(src[0]) * 360);
    const s = PC(clamp01(src[1]));
    const l = PC(clamp01(src[2]));
    const a = ensureAlpha(src[3]);
    return a < 1 ? `hsla(${h},${s},${l},${FF(a)})` : `hsl(${h},${s},${l})`;
};
