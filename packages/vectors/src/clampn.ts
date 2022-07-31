import { clamp as _clamp } from "@thi.ng/math/interval";
import type { MultiVecOpVNN, VecOpVNN } from "./api.js";
import { defHofOp } from "./compile/emit.js";

export const [clampN, clampN2, clampN3, clampN4] = defHofOp<
	MultiVecOpVNN,
	VecOpVNN
>(_clamp, ([o, a]) => `${o}=op(${a},n,m);`, "o,a,n,m", "o,a");
