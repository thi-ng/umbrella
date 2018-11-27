import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./internal/codegen";

/**
 * Returns `out = a + b * c`.
 */
export const [madd, madd2, madd3, madd4] =
    defOp<MultiVecOpVVV, VecOpVVV>(
        ([o, a, b, c]) => `${o}=${a}+${b}*${c};`,
        "o,a,b,c"
    );
