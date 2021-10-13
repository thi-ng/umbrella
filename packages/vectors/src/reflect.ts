import type { VecOpVV } from "./api.js";
import { dot } from "./dot.js";
import { maddN } from "./maddn.js";

export const reflect: VecOpVV = (out, a, b) =>
    maddN(out || a, b, -2 * dot(a, b), a);
