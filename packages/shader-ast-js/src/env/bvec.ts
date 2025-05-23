// SPDX-License-Identifier: Apache-2.0
import { every2, every3, every4 } from "@thi.ng/vectors/every";
import { logicNot2, logicNot3, logicNot4 } from "@thi.ng/vectors/logic-not";
import { some2, some3, some4 } from "@thi.ng/vectors/some";
import type { JSBuiltinsBool } from "../api.js";

export const BVEC2: JSBuiltinsBool = {
	all: every2,
	any: some2,
	not: (v) => logicNot2([], v),
};

export const BVEC3: JSBuiltinsBool = {
	all: every3,
	any: some3,
	not: (v) => logicNot3([], v),
};

export const BVEC4: JSBuiltinsBool = {
	all: every4,
	any: some4,
	not: (v) => logicNot4([], v),
};
