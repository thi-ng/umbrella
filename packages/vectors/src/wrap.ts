import { wrap as _wrap } from "@thi.ng/math";
import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defHofOp } from "./internal/codegen";
import { FN3 } from "./internal/templates";

export const [wrap, wrap2, wrap3, wrap4] = defHofOp<MultiVecOpVVV, VecOpVVV>(
    _wrap,
    FN3(),
    ARGS_VVV
);
