import type { FnU2 } from "@thi.ng/api";
import type { VecOpVN } from "./api";
import { set } from "./set";

const _rotate: FnU2<number, VecOpVN> = (u, v) => (out, a, theta) => {
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

/**
 * Alias for {@link rotateZ} (e.g. for 2D use cases)
 */
export const rotate = rotateZ;
