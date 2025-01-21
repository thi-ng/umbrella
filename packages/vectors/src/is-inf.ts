// SPDX-License-Identifier: Apache-2.0
import type { MultiToBVecOpV, ToBVecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [isInf, isInf2, isInf3, isInf4] = defFnOp<
	MultiToBVecOpV,
	ToBVecOpV
>("!isFinite");
