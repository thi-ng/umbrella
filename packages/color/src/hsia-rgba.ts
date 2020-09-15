import { setC3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { clampH } from "./clamp";

// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSI

export const hsiaRgba: ColorOp = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const i = out[2];
    if (s < 1e-6) {
        return setC3(out, i, i, i);
    }
    const h = (out[0] * 6) % 6;
    const m = i * (1 - s);
    const z = 1 - Math.abs((h % 2) - 1);
    let c = (3 * i * s) / (1 + z);
    const x = c * z + m;
    c += m;
    switch (h | 0) {
        case 0:
            return setC3(out, c, x, m);
        case 1:
            return setC3(out, x, c, m);
        case 2:
            return setC3(out, m, c, x);
        case 3:
            return setC3(out, m, x, c);
        case 4:
            return setC3(out, x, m, c);
        case 5:
            return setC3(out, c, m, x);
        default:
            return setC3(out, m, m, m);
    }
};
