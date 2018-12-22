import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";

export const rgbaHsva =
    (out: Color, rgba: ReadonlyColor) => {
        out = clamp(out || rgba, rgba);
        const r = out[0];
        const g = out[1];
        const b = out[2];
        const v = Math.max(r, g, b);
        const d = v - Math.min(r, g, b);
        let h = 0, s = 0;
        if (v > 1e-6) {
            s = d / v;
        }
        if (s > 1e-6) {
            if (r === v) {
                h = (g - b) / d;
            } else if (g === v) {
                h = 2 + (b - r) / d;
            } else {
                h = 4 + (r - g) / d;
            }
            h /= 6;
            if (h < 0) {
                h++;
            }
        }
        return setC3(out, h, s, v);
    };
