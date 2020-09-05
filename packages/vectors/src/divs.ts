import type { VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [divS2, divS3, divS4] = defOpS<VecOpSVV>(MATH("/"));
