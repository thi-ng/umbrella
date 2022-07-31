import type { BVecOpV, MultiBVecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_V, NEW_OUT } from "./compile/templates.js";

export const [not, not2, not3, not4] = defOp<MultiBVecOpV, BVecOpV>(
	([o, a]) => `${o}=!${a};`,
	ARGS_V,
	ARGS_V,
	"o",
	1,
	NEW_OUT
);
