import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [subS, subS2, subS3, subS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("-")
);
