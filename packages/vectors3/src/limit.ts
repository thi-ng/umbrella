import { ReadonlyVec, Vec } from "./api";
import { mag } from "./mag";
import { mulN } from "./muln";

export const limit =
    (out: Vec, v: ReadonlyVec, n: number) => {
        let m = mag(v);
        return m > n ? mulN(out, v, n / m) : v;
    };
