import type { VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [mulS2, mulS3, mulS4] = defOpS<VecOpSVV>(MATH("*"));
