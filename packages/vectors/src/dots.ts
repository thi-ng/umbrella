import type { ReadonlyVec, VecOpSRoVV } from "./api";
import { compile } from "./compile/emit";
import { DOT, SARGS_V } from "./compile/templates";

export const dotS = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    n: number,
    ia = 0,
    ib = 0,
    sa = 1,
    sb = 1
) => {
    let sum = 0;
    for (; --n >= 0; ia += sa, ib += sb) sum += a[ia] * b[ib];
    return sum;
};

const $ = (dim: number): VecOpSRoVV<number> =>
    compile(dim, DOT, `o,a,${SARGS_V}`, "o,a", "", "+", "return ", ";", true);

export const dotS2 = $(2);
export const dotS3 = $(3);
export const dotS4 = $(4);
