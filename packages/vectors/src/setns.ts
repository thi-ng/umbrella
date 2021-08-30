import type { VecOpSGN, VecOpSN } from "./api";
import { defOpS } from "./internal/codegen";
import { SET_N } from "./internal/templates";

export const [setNS, setNS2, setNS3, setNS4] = defOpS<VecOpSGN, VecOpSN>(
    SET_N,
    "o,n",
    "io=0,so=1",
    "o",
    "o",
    ""
);
