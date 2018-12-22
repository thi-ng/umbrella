import { SIXTH, THIRD, TWO_THIRD } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";
import { ensureHue } from "./ensure-hue";

export const hslaRgba =
    (out: Color, hsla: ReadonlyColor) => {
        out = clamp(out || hsla, hsla);
        const h = out[0];
        const s = out[1];
        const l = out[2];
        if (s > 1e-6) {
            const f2 = (l < 0.5) ?
                (l * (s + 1)) :
                (l + s) - (l * s);
            const f1 = 2 * l - f2;
            return setC3(
                out,
                hslHue(f1, f2, h + THIRD),
                hslHue(f1, f2, h),
                hslHue(f1, f2, h - THIRD),
            );
        }
        return setC3(out, l, l, l);
    };

const hslHue =
    (f1: number, f2: number, h: number) => {
        h = ensureHue(h);
        return clamp01(
            (h < SIXTH) ?
                f1 + (f2 - f1) * 6 * h :
                (h < 0.5) ?
                    f2 :
                    (h < TWO_THIRD) ?
                        f1 + (f2 - f1) * (TWO_THIRD - h) * 6 :
                        f1
        );
    };
