// SPDX-License-Identifier: Apache-2.0
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { ReadonlyVec, Vec } from "@thi.ng/vec-api";
import { add3 } from "./add.js";
import { randNorm3 } from "./rand-norm.js";

export const jitter3 = (
	out: Vec | null,
	a: ReadonlyVec,
	n = 1,
	rnd: IRandom = SYSTEM
) => add3(out, a, randNorm3(new Array(a.length), n, rnd));
