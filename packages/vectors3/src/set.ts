import { MultiVecOpV, VecOpV } from "./api";
import { defOp } from "./codegen";

export const [set, set2, set3, set4] =
    defOp<MultiVecOpV, VecOpV>(([o, a]) => `${o}=${a};`);
