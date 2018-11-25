import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./codegen";

export const [madd, madd2, madd3, madd4] =
    defOp<MultiVecOpVVV, VecOpVVV>(
        ([o, a, b, c]) => `${o}=${a}+${b}*${c};`,
        "o,a,b,c"
    );
