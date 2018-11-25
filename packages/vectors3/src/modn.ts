import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./codegen";

export const [modN, modN2, modN3, modN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}%n;`, "o,a,n");
