import { clamp as _clamp } from "@thi.ng/math/interval";
import { MultiVecOpVVV, VecOpVVV } from "./api";
import { defHofOp } from "./internal/codegen";

export const [clamp, clamp2, clamp3, clamp4] =
    defHofOp<MultiVecOpVVV, VecOpVVV>(
        _clamp,
        ([o, a, b, c]) => `${o}=op(${a},${b},${c});`,
        "o,a,b,c"
    );
