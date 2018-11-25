import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./codegen";

export const [add, add2, add3, add4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=${a}+${b};`);
