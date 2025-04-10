// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vec-api";
import { normalize3 } from "./normalize.js";
import { sub3 } from "./sub.js";

export const direction3 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	n = 1
) => normalize3(null, sub3(out || a, b, a), n);
