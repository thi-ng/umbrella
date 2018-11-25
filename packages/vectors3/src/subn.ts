import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./codegen";

export const [subN, subN2, subN3, subN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}-n;`, "o,a,n");
