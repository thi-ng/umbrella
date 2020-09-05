import type { MultiVecOpV, VecOpV } from "./api";
import { defOp } from "./internal/codegen";

export const [invert, invert2, invert3, invert4] = defOp<MultiVecOpV, VecOpV>(
    ([o, a]) => `${o}=1/${a};`
);
