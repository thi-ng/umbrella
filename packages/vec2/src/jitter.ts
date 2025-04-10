// SPDX-License-Identifier: Apache-2.0
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { ReadonlyVec, Vec } from "@thi.ng/vec-api";
import { add2 } from "./add.js";
import { randNorm2 } from "./rand-norm.js";

export const jitter2 = (
	out: Vec | null,
	a: ReadonlyVec,
	n = 1,
	rnd: IRandom = SYSTEM
) => add2(out, a, randNorm2(new Array(a.length), n, rnd));
