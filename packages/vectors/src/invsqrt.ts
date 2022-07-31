import type { MultiVecOpV, VecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";

export const [invSqrt, invSqrt2, invSqrt3, invSqrt4] = defOp<
	MultiVecOpV,
	VecOpV
>(([o, a]) => `${o}=1/Math.sqrt(${a});`);
