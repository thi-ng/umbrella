import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [divS, divS2, divS3, divS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("/")
);
