// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpV, VecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_V } from "./compile/templates.js";

export const [invSqrt, invSqrt2, invSqrt3, invSqrt4] = defOp<
	MultiVecOpV,
	VecOpV
>(([o, a]) => `${o}=1/Math.sqrt(${a});`, ARGS_V);
