// SPDX-License-Identifier: Apache-2.0
import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH, NEW_OUT } from "./compile/templates.js";

export const [neq, neq2, neq3, neq4] = defOp<MultiCompareOp, CompareOp>(
	MATH("!=="),
	undefined,
	undefined,
	undefined,
	undefined,
	NEW_OUT
);
