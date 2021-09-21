import type { MultiVecOpV, VecOpV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_V } from "./compile/templates";

export const [bitNotI, bitNotI2, bitNotI3, bitNotI4] = defOp<
    MultiVecOpV,
    VecOpV
>(([o, a]) => `${o}=(~${a})|0;`, ARGS_V);
export const [bitNotU, bitNotU2, bitNotU3, bitNotU4] = defOp<
    MultiVecOpV,
    VecOpV
>(([o, a]) => `${o}=(~${a})>>>0;`, ARGS_V);
