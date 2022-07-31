import type { VecOpSGVV, VecOpSVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [subS, subS2, subS3, subS4] = defOpS<VecOpSGVV, VecOpSVV>(
	MATH("-")
);
