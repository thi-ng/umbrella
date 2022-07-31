import type { VecOpSGVV, VecOpSVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [addS, addS2, addS3, addS4] = defOpS<VecOpSGVV, VecOpSVV>(
	MATH("+")
);
