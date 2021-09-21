import type { VecOpSGV, VecOpSV } from "./api";
import { defOpS } from "./compile/emit";
import { NEW_OUT, SARGS_V, SET } from "./compile/templates";

export const [setS, setS2, setS3, setS4] = defOpS<VecOpSGV, VecOpSV>(
    SET,
    "o,a",
    SARGS_V,
    "o,a",
    "o",
    NEW_OUT
);
