import { BVecOpV, MultiBVecOpV } from "./api";
import { ARGS_V, defOp, NEW_OUT } from "./internal/codegen";

export const [not, not2, not3, not4] = defOp<MultiBVecOpV, BVecOpV>(
    ([o, a]) => `${o}=!${a};`,
    ARGS_V,
    ARGS_V,
    "o",
    1,
    NEW_OUT
);
