import { fract as _fract } from "@thi.ng/math/prec";
import type { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./compile/emit";

export const [fract, fract2, fract3, fract4] = defHofOp<MultiVecOpV, VecOpV>(
    _fract
);
