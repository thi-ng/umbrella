import type { VecOpSGVVV, VecOpSVVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_VVV, MATH2, SARGS_VVV } from "./compile/templates.js";

export const [maddS, maddS2, maddS3, maddS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
	MATH2("*", "+"),
	ARGS_VVV,
	SARGS_VVV,
	ARGS_VVV
);
