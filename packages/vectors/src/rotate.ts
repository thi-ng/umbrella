import { VecOpVN } from "./api";
import { set } from "./set";

const _rotate = (u: number, v: number): VecOpVN => (out, a, theta) => {
    out ? out !== a && set(out, a) : (out = a);
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    const x = a[u];
    const y = a[v];
    out[u] = x * c - y * s;
    out[v] = x * s + y * c;
    return out;
};

export const rotateX = _rotate(1, 2);
export const rotateY = _rotate(2, 0);
export const rotateZ = _rotate(0, 1);
