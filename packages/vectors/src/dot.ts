import type { MultiVecOpRoVV } from "./api.js";
import { compile, compileG } from "./compile/emit.js";
import { DOT, DOT_G } from "./compile/templates.js";
import { vop } from "./vop.js";

const $ = (dim: number) =>
    dot.add(dim, compile(dim, DOT, "a,b", undefined, "", "+", "return ", ";"));

export const dot: MultiVecOpRoVV<number> = vop();

dot.default(compileG(DOT_G, "a,b", undefined, "s", "let s=0;"));

export const dot2 = $(2);
export const dot3 = $(3);
export const dot4 = $(4);
