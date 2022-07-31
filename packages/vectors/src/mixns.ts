import type { VecOpSGVVN, VecOpSVVN } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_VVN, MIX_N, SARGS_VV } from "./compile/templates.js";

export const [mixNS, mixNS2, mixNS3, mixNS4] = defOpS<VecOpSGVVN, VecOpSVVN>(
	MIX_N,
	ARGS_VVN,
	SARGS_VV
);
