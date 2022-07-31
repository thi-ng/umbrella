import type { MultiVecOpV, VecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { NEW_OUT, SET } from "./compile/templates.js";

export const [set, set2, set3, set4] = defOp<MultiVecOpV, VecOpV>(
	SET,
	"o,a",
	undefined,
	"o",
	1,
	NEW_OUT
);
