import type { ReadonlyVec, Vec, VecOpSV } from "./api";
import { defOpS, NEW_OUT, SARGS_V } from "./internal/codegen";
import { SET } from "./internal/templates";

export const [setS2, setS3, setS4] = defOpS<VecOpSV>(
    SET,
    `o,a,${SARGS_V}`,
    "o,a",
    "o",
    NEW_OUT
);

export const setS = (
    out: Vec,
    a: ReadonlyVec,
    n: number,
    io = 0,
    ia = 0,
    so = 1,
    sa = 1
) => {
    for (let i = 0; i < n; i++) {
        out[io + i * so] = a[ia + i * sa];
    }
    return out;
};
