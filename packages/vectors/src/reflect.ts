import type { VecOpVV } from "./api";
import { dot } from "./dot";
import { maddN } from "./maddn";

export const reflect: VecOpVV = (out, a, b) =>
    maddN(out || a, b, -2 * dot(a, b), a);
