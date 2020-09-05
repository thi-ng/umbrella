import type { VecOpVVN } from "./api";
import { dot } from "./dot";
import { maddN } from "./maddn";
import { mulN } from "./muln";
import { zero } from "./setn";

export const refract: VecOpVVN = (out, a, n, eta) => {
    !out && (out = a);
    const d = dot(a, n);
    const k = 1 - eta * eta * (1 - d * d);
    return k < 0
        ? zero(out)
        : maddN(out, n, -(eta * d + Math.sqrt(k)), mulN(out, a, eta));
};
