import type { BVecOpV, MultiBVecOpV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_V, NEW_OUT } from "./compile/templates";

export const [not, not2, not3, not4] = defOp<MultiBVecOpV, BVecOpV>(
    ([o, a]) => `${o}=!${a};`,
    ARGS_V,
    ARGS_V,
    "o",
    1,
    NEW_OUT
);
