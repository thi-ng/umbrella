import type { ReadonlyVec, Vec } from "./api.js";
import { mag } from "./mag.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";

export const limit = (out: Vec, v: ReadonlyVec, n: number) => {
    !out && (out = v);
    const m = mag(v);
    return m > n ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};
