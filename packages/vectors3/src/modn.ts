import { MultiVecOpVN, VecOpVN } from "./api";
import { ARGS_VN, defOp } from "./internal/codegen";

export const [modN, modN2, modN3, modN4] =
    defOp<MultiVecOpVN, VecOpVN>(([o, a]) => `${o}=${a}%n;`, ARGS_VN);
