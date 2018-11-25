import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./codegen";

export const [addN, addN2, addN3, addN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}+n;`, "o,a,n");
