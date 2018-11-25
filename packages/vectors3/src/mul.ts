import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./codegen";

export const [mul, mul2, mul3, mul4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=${a}*${b};`);
