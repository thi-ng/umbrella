// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpV, VecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_V } from "./compile/templates.js";

export const [invert, invert2, invert3, invert4] = defOp<MultiVecOpV, VecOpV>(
	([o, a]) => `${o}=1/${a};`,
	ARGS_V
);
