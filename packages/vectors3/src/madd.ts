import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./internal/codegen";

export const [madd, madd2, madd3, madd4] =
    defOp<MultiVecOpVVV, VecOpVVV>(
        ([o, a, b, c]) => `${o}=${a}+${b}*${c};`,
        "o,a,b,c"
    );
