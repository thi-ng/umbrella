import type { ColorOp } from "../api.js";
import { clampH } from "../clamp.js";

export const hsvHsl: ColorOp = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const v = out[2];
    const l = ((2 - s) * v) / 2;
    out[2] = l;
    out[1] = l && l < 1 ? (s * v) / (l < 0.5 ? l * 2 : 2 - l * 2) : s;
    return out;
};
