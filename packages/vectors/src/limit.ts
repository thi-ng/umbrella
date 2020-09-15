import type { ReadonlyVec, Vec } from "./api";
import { mag } from "./mag";
import { mulN } from "./muln";
import { set } from "./set";

export const limit = (out: Vec, v: ReadonlyVec, n: number) => {
    !out && (out = v);
    const m = mag(v);
    return m > n ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};
