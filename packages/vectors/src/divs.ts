import type { VecOpSGVV, VecOpSVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [divS, divS2, divS3, divS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("/")
);
