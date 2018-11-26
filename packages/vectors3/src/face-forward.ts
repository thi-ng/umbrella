import { VecOpVVV } from "./api";
import { dot } from "./dot";
import { mulN } from "./muln";
import { set } from "./set";

export const faceForward: VecOpVVV =
    (out, n, i, nref) =>
        dot(nref, i) < 0 ?
            out === n ? out : set(out, n) :
            mulN(out, n, -1);
