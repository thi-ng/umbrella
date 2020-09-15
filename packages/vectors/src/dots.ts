import type { VecOpSRoVV } from "./api";
import { compile, SARGS_V } from "./internal/codegen";
import { DOT } from "./internal/templates";

const $ = (dim: number): VecOpSRoVV<number> =>
    compile(dim, DOT, `o,a,${SARGS_V}`, "o,a", "", "+", "return ", ";", true);

export const dotS2 = $(2);
export const dotS3 = $(3);
export const dotS4 = $(4);
