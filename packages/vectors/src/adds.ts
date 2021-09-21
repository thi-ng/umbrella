import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [addS, addS2, addS3, addS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("+")
);
