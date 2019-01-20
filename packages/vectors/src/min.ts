import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";

export const [min, min2, min3, min4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=Math.min(${a},${b});`);
