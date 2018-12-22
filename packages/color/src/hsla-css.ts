import { clamp01 } from "@thi.ng/math/interval";
import { FF, PC, ReadonlyColor } from "./api";
import { ensureAlpha } from "./ensure-alpha";

export const hslaCss =
    (hsla: ReadonlyColor) => {
        const h = FF(clamp01(hsla[0]) * 360);
        const s = PC(clamp01(hsla[1]));
        const l = PC(clamp01(hsla[2]));
        const a = ensureAlpha(hsla[3]);
        return (a < 1) ?
            `hsla(${h},${s},${l},${FF(a)})` :
            `hsl(${h},${s},${l})`
    };
