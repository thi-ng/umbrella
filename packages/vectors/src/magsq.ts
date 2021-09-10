import type { MultiVecOpRoV } from "./api";
import { compile, compileG } from "./compile/emit";
import { vop } from "./vop";

const $ = (dim: number) =>
    magSq.add(
        dim,
        compile(dim, ([a]) => `${a}*${a}`, "a", "a", "", "+", "return ", ";")
    );

export const magSq: MultiVecOpRoV<number> = vop();

magSq.default(
    compileG(([a]) => `sum+=${a}*${a};`, "a", undefined, "sum", "let sum=0;")
);

export const magSq2 = $(2);
export const magSq3 = $(3);
export const magSq4 = $(4);
