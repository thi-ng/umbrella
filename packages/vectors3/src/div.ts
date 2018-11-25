import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";

export const [div, div2, div3, div4] =
    defOp<MultiVecOpVV, VecOpVV>(([o, a, b]) => `${o}=${a}/${b};`);
