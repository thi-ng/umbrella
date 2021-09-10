import { wrap as _wrap } from "@thi.ng/math/interval";
import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { defHofOp } from "./compile/emit";
import { ARGS_VVV, FN3 } from "./compile/templates";

export const [wrap, wrap2, wrap3, wrap4] = defHofOp<MultiVecOpVVV, VecOpVVV>(
    _wrap,
    FN3(),
    ARGS_VVV
);
