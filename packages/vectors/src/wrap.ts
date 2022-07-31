import { wrap as _wrap } from "@thi.ng/math/interval";
import type { MultiVecOpVVV, VecOpVVV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { ARGS_VVV, FN3 } from "./compile/templates.js";

export const [wrap, wrap2, wrap3, wrap4] = defHofOp<MultiVecOpVVV, VecOpVVV>(
	_wrap,
	FN3(),
	ARGS_VVV
);
