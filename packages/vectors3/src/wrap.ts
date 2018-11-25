import { wrap as _wrap } from "@thi.ng/math/interval";
import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defHofOp } from "./internal/codegen";

export const [wrap, wrap2, wrap3, wrap4] =
    defHofOp<MultiVecOpVVV, VecOpVVV>(
        _wrap,
        ([o, a, b, c]) => `${o}=op(${a},${b},${c});`,
        "o,a,b,c"
    );
