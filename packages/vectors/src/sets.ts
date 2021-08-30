import type { VecOpSGV, VecOpSV } from "./api";
import { defOpS, NEW_OUT, SARGS_V } from "./internal/codegen";
import { SET } from "./internal/templates";

export const [setS, setS2, setS3, setS4] = defOpS<VecOpSGV, VecOpSV>(
    SET,
    "o,a",
    SARGS_V,
    "o,a",
    "o",
    NEW_OUT
);
