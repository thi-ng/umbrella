import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { clampH } from "./clamp";

export const hsvaRgba =
    (out: Color, hsva: ReadonlyColor) => {
        out = clampH(out || hsva, hsva);
        const s = out[1];
        const v = out[2];
        if (s > 1e-6) {
            const h = (out[0] * 6) % 6;
            const i = h | 0;
            const f = h - i;
            const p = v * (1 - s);
            const q = v * (1 - s * f);
            const t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    return setC3(out, v, t, p);
                case 1:
                    return setC3(out, q, v, p);
                case 2:
                    return setC3(out, p, v, t);
                case 3:
                    return setC3(out, p, q, v);
                case 4:
                    return setC3(out, t, p, v);
                default:
                    return setC3(out, v, p, q);
            }
        }
        return setC3(out, v, v, v);
    };
