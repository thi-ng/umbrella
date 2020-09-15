import { IRandom, SYSTEM } from "@thi.ng/random";
import { add } from "./add";
import type { ReadonlyVec, Vec } from "./api";
import { randNorm } from "./random";

export const jitter = (
    out: Vec | null,
    a: ReadonlyVec,
    n = 1,
    rnd: IRandom = SYSTEM
) => add(out, a, randNorm(new Array(a.length), n, rnd));
