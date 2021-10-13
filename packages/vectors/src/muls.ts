import type { VecOpSGVV, VecOpSVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [mulS, mulS2, mulS3, mulS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("*")
);
