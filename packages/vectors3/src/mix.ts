import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./codegen";

export const [mix, mix2, mix3, mix4] =
    defOp<MultiVecOpVVV, VecOpVVV>(
        ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`,
        "o,a,b,c"
    );
