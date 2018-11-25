import { VecOpVVN } from "./api";

export const rotateAroundPoint2: VecOpVVN =
    (out, a, b, theta) => {
        const x = a[0] - b[0];
        const y = a[1] - b[1];
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        out[0] = x * c - y * s + b[0];
        out[1] = x * s + y * c + b[1];
        return out;
    };
