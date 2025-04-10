// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vec-api";
import { normalize2 } from "./normalize.js";
import { sub2 } from "./sub.js";

export const direction2 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n = 1
) => normalize2(null, sub2(out || a, b, a), n);
