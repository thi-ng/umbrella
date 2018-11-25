import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./codegen";

export const [divN, divN2, divN3, divN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}/n;`, "o,a,n");
