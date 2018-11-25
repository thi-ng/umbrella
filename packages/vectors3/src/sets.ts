import { VecOpSV } from "./api";
import { defOpS, SARGS_V } from "./internal/codegen";
import { SET } from "./internal/templates";

export const [setS2, setS3, setS4] =
    defOpS<VecOpSV>(SET, `o,a,${SARGS_V}`, "o,a");
