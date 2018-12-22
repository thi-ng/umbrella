import { SIXTH, THIRD, TWO_THIRD } from "@thi.ng/math/api";
import { setC3 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { clamp } from "./clamp";

export const rgbaHsla =
    (out: Color, rgba: ReadonlyColor) => {
        out = clamp(out || rgba, rgba);
        const r = out[0];
        const g = out[1];
        const b = out[2];
        const f1 = Math.min(r, g, b);
        const f2 = Math.max(r, g, b);
        const l = (f1 + f2) * 0.5;
        const d = f2 - f1;
        let h: number;
        let s: number;
        if (d > 1e-6) {
            s = (l < 0.5) ?
                (d / (f1 + f2)) :
                (d / (2 - f2 - f1));
            const d2 = d * 0.5;
            const id = 1 / d;
            const dr = ((f2 - r) * SIXTH + d2) * id;
            const dg = ((f2 - g) * SIXTH + d2) * id;
            const db = ((f2 - b) * SIXTH + d2) * id;
            h = (f2 === r) ?
                (db - dg) :
                (f2 === g) ?
                    (THIRD + dr - db) :
                    (TWO_THIRD + dg - dr);
            h = (h < 0) ?
                h + 1 :
                (h >= 1) ?
                    h - 1 :
                    h;
        } else {
            h = s = 0;
        }
        return setC3(out, h, s, l);
    };
