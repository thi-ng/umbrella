// SPDX-License-Identifier: Apache-2.0
import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH, NEW_OUT } from "./compile/templates.js";

export const [eq, eq2, eq3, eq4] = defOp<MultiCompareOp, CompareOp>(
	MATH("==="),
	undefined,
	undefined,
	undefined,
	undefined,
	NEW_OUT
);
