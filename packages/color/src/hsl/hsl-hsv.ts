import type { ColorOp } from "../api";
import { clampH } from "../ops/clamp";

export const hslHsv: ColorOp = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const l = out[2];
    const l2 = 2 * l;
    const v = (l2 + s * (1 - Math.abs(l2 - 1))) * 0.5;
    out[1] = (2 * (v - l)) / v;
    out[2] = v;
    return out;
};
