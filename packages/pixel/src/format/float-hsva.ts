import { EPS } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { Lane } from "../api";
import { defFloatFormat } from "./float-format";

const abs = Math.abs;
const min = Math.min;

export const FLOAT_HSVA = defFloatFormat({
    alpha: true,
    channels: [Lane.RED, Lane.GREEN, Lane.BLUE, Lane.ALPHA],
    convert: {
        fromABGR: (x, out = []) => {
            const a = ((x >>> 24) & 0xff) / 0xff;
            const b = ((x >>> 16) & 0xff) / 0xff;
            const g = ((x >>> 8) & 0xff) / 0xff;
            const r = (x & 0xff) / 0xff;
            let p0: number, p1: number, p2: number, p3: number;
            let q0: number, q1: number, q2: number, q3: number;
            if (g < b) {
                p0 = b;
                p1 = g;
                p2 = -1;
                p3 = 2 / 3;
            } else {
                p0 = g;
                p1 = b;
                p2 = 0;
                p3 = -1 / 3;
            }
            if (r < p0) {
                q0 = p0;
                q1 = p1;
                q2 = p3;
                q3 = r;
            } else {
                q0 = r;
                q1 = p1;
                q2 = p2;
                q3 = p0;
            }
            const c = q0 - min(q1, q3);
            q0 = clamp01(q0);
            out[0] = clamp01(abs((q3 - q1) / (6 * c + EPS) + q2));
            out[1] = clamp01(c / (q0 + EPS));
            out[2] = q0;
            out[3] = a;
            return out;
        },
        toABGR: (x) => {
            const h = x[0] * 6;
            const s = x[1];
            const v = x[2] * 0xff;
            const a = x[3] * 0xff;
            const r = ((clamp01(abs(h - 3) - 1) - 1) * s + 1) * v;
            const g = ((clamp01(2 - abs(h - 2)) - 1) * s + 1) * v;
            const b = ((clamp01(2 - abs(h - 4)) - 1) * s + 1) * v;
            return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
        },
    },
});
