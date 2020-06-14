import { MultiVecOpV, MultiVecOpVV, VecOpV, VecOpVV } from "./api";
import { ARGS_VV, defFnOp, defOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

export const [atan, atan2, atan3, atan4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.atan"
);

export const [atan_2, atan_22, atan_23, atan_24] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.atan2"),
    ARGS_VV
);
