import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";

export const [mod, mod2, mod3, mod4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=${a}%${b};`);
