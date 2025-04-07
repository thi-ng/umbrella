// SPDX-License-Identifier: Apache-2.0
import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH, NEW_OUT } from "./compile/templates.js";

export const [lte, lte2, lte3, lte4] = defOp<MultiCompareOp, CompareOp>(
	MATH("<="),
	undefined,
	undefined,
	undefined,
	undefined,
	NEW_OUT
);
