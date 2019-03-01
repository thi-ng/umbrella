import { VecOpSV } from "./api";
import { defOpS } from "./internal/codegen";
import { SET_N } from "./internal/templates";

export const [setSN2, setSN3, setSN4] = defOpS<VecOpSV>(
    SET_N,
    "o,n,io=0,so=1",
    "o",
    "o",
    ""
);
