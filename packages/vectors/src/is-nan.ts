// SPDX-License-Identifier: Apache-2.0
import type { MultiToBVecOpV, ToBVecOpV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { ARGS_V, FN, NEW_OUT } from "./compile/templates.js";

export const [isNaN, isNaN2, isNaN3, isNaN4] = defHofOp<
	MultiToBVecOpV,
	ToBVecOpV
>(globalThis.isNaN, FN("op"), ARGS_V, undefined, undefined, undefined, NEW_OUT);
