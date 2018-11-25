import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./codegen";

export const [max, max2, max3, max4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=Math.max(${a},${b});`);
