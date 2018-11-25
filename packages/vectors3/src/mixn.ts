import { MultiVecOpVVN, VecOpVVN } from "./api";
import { defOp } from "./internal/codegen";

export const [mixN, mixN2, mixN3, mixN4] =
    defOp<MultiVecOpVVN, VecOpVVN>(
        ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`,
        "o,a,b,n"
    );
