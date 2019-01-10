import { wrap as _wrap } from "@thi.ng/math";
import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defHofOp } from "./internal/codegen";
import { HOF_VVV } from "./internal/templates";

export const [wrap, wrap2, wrap3, wrap4] =
    defHofOp<MultiVecOpVVV, VecOpVVV>(_wrap, HOF_VVV, ARGS_VVV);
