import type { VecOpVVN } from "./api.js";
import { setC2 } from "./setc.js";

export const rotateAroundPoint2: VecOpVVN = (out, v, p, theta) => {
    const x = v[0] - p[0];
    const y = v[1] - p[1];
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setC2(out || v, x * c - y * s + p[0], x * s + y * c + p[1]);
};
