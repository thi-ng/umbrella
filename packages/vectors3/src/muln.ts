import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./internal/codegen";

export const [mulN, mulN2, mulN3, mulN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}*n;`, "o,a,n");
