import { MultiVecOpV, VecOpV } from "./api";
import { ARGS_V, defOp } from "./internal/codegen";

export const [notI, notI2, notI3, notI4] = defOp<MultiVecOpV, VecOpV>(
    ([o, a]) => `${o}=(~${a})|0;`,
    ARGS_V
);
export const [notU, notU2, notU3, notU4] = defOp<MultiVecOpV, VecOpV>(
    ([o, a]) => `${o}=(~${a})>>>0;`,
    ARGS_V
);
