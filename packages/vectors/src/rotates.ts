import type { VecOpSV, VecOpSVN } from "./api.js";
import { setS2, setS3 } from "./sets.js";

const _rotate =
    (set: VecOpSV, u: number, v: number): VecOpSVN =>
    (out, a, theta, io = 0, ia = 0, so = 1, sa = 1) => {
        out ? out !== a && set(out, a, io, ia, so, sa) : (out = a);
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        const x = a[ia + u * sa];
        const y = a[ia + v * sa];
        out[io + u * so] = x * c - y * s;
        out[io + v * so] = x * s + y * c;
        return out;
    };

export const rotateS2 = _rotate(setS2, 0, 1);

export const rotateXS3 = _rotate(setS3, 1, 2);
export const rotateYS3 = _rotate(setS3, 2, 0);
export const rotateZS3 = _rotate(setS3, 0, 1);
