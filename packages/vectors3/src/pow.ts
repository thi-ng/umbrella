import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";

export const [pow, pow2, pow3, pow4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=Math.pow(${a},${b});`);
