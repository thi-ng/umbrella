import { EPS } from "@thi.ng/math/api";
import { ReadonlyVec, Vec } from "./api";
import { mag } from "./mag";
import { mulN } from "./muln";

export const normalize =
    (out: Vec, v: ReadonlyVec, n = 1) => {
        let m = mag(v);
        return m >= EPS ? mulN(out, v, n / m) : v;
    };
