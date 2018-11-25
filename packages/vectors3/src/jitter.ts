import { IRandom } from "@thi.ng/random/api";
import { SYSTEM } from "@thi.ng/random/system";
import { add } from "./add";
import { ReadonlyVec, Vec } from "./api";
import { randNorm } from "./random";
import { zeroes } from "./setn";

export const jitter =
    (out: Vec, a: ReadonlyVec, n = 1, rnd: IRandom = SYSTEM) =>
        add(out, randNorm(zeroes(a.length), n, rnd), a);
