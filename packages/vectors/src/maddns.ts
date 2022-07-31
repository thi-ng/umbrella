import type { VecOpSGVNV, VecOpSVNV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_VNV, MATH2A_N, SARGS_VV } from "./compile/templates.js";

export const [maddNS, maddNS2, maddNS3, maddNS4] = defOpS<
	VecOpSGVNV,
	VecOpSVNV
>(MATH2A_N("*", "+"), ARGS_VNV, SARGS_VV);
