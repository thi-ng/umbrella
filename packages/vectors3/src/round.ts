import { roundTo as _round } from "@thi.ng/math/prec";
import { MultiVecOpVO, VecOpVO } from "./api";
import { defHofOp } from "./internal/codegen";

export const [round, round2, round3, round4] =
    defHofOp<MultiVecOpVO<number>, VecOpVO<number>>(
        _round,
        ([o, a]) => `${o}=op(${a},n);`,
        "o,a,n=1",
        "o,a"
    );
