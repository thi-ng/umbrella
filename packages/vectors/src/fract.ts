import { fract as _fract } from "@thi.ng/math/prec";
import type { MultiVecOpV, VecOpV } from "./api.js";
import { defHofOp } from "./compile/emit.js";

export const [fract, fract2, fract3, fract4] = defHofOp<MultiVecOpV, VecOpV>(
    _fract
);
