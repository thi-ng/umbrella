import type { VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [addS2, addS3, addS4] = defOpS<VecOpSVV>(MATH("+"));
