import type { MultiVecOpRoVV } from "./api";
import { compile, compileG } from "./compile/emit";
import { DOT, DOT_G } from "./compile/templates";
import { vop } from "./vop";

const $ = (dim: number) =>
    dot.add(dim, compile(dim, DOT, "a,b", undefined, "", "+", "return ", ";"));

export const dot: MultiVecOpRoVV<number> = vop();

dot.default(compileG(DOT_G, "a,b", undefined, "s", "let s=0;"));

export const dot2 = $(2);
export const dot3 = $(3);
export const dot4 = $(4);
