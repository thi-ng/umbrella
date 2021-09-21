import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./compile/emit";
import { MATH } from "./compile/templates";

export const [mulS, mulS2, mulS3, mulS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("*")
);
