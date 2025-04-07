// SPDX-License-Identifier: Apache-2.0
import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH, NEW_OUT } from "./compile/templates.js";

export const [gte, gte2, gte3, gte4] = defOp<MultiCompareOp, CompareOp>(
	MATH(">="),
	undefined,
	undefined,
	undefined,
	undefined,
	NEW_OUT
);
