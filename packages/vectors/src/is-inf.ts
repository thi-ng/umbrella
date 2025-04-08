// SPDX-License-Identifier: Apache-2.0
import type { MultiToBVecOpV, ToBVecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_V, FN, NEW_OUT } from "./compile/templates.js";

export const [isInf, isInf2, isInf3, isInf4] = defOp<MultiToBVecOpV, ToBVecOpV>(
	FN("!isFinite"),
	ARGS_V,
	undefined,
	undefined,
	undefined,
	NEW_OUT
);
