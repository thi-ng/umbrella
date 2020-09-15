import type { VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [subS2, subS3, subS4] = defOpS<VecOpSVV>(MATH("-"));
