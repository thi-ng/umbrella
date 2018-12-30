import { IRandom } from "@thi.ng/random/api";
import { SYSTEM } from "@thi.ng/random/system";
import { add } from "./add";
import { ReadonlyVec, Vec } from "./api";
import { randNorm } from "./random";

export const jitter =
    (out: Vec, a: ReadonlyVec, n = 1, rnd: IRandom = SYSTEM) =>
        add(out, a, randNorm(new Array(a.length), n, rnd));
