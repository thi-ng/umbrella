import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./codegen";

export const [powN, powN2, powN3, powN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=Math.pow(${a},n);`, "o,a,n");
