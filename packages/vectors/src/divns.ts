import type { VecOpSGVN, VecOpSVN } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_V, ARGS_VN, MATH_N, SARGS_V } from "./compile/templates.js";

export const [divNS, divNS2, divNS3, divNS4] = defOpS<VecOpSGVN, VecOpSVN>(
	MATH_N("/"),
	ARGS_VN,
	SARGS_V,
	ARGS_V
);
