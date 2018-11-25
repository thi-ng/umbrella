import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";

export const [sub, sub2, sub3, sub4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=${a}-${b};`);
