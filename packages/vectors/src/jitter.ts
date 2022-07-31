import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { add } from "./add.js";
import type { ReadonlyVec, Vec } from "./api.js";
import { randNorm } from "./random.js";

export const jitter = (
	out: Vec | null,
	a: ReadonlyVec,
	n = 1,
	rnd: IRandom = SYSTEM
) => add(out, a, randNorm(new Array(a.length), n, rnd));
