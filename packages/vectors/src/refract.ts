import type { VecOpVVN } from "./api.js";
import { dot } from "./dot.js";
import { maddN } from "./maddn.js";
import { mulN } from "./muln.js";
import { zero } from "./setn.js";

export const refract: VecOpVVN = (out, a, n, eta) => {
    !out && (out = a);
    const d = dot(a, n);
    const k = 1 - eta * eta * (1 - d * d);
    return k < 0
        ? zero(out)
        : maddN(out, n, -(eta * d + Math.sqrt(k)), mulN(out, a, eta));
};
